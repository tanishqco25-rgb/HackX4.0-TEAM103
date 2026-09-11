from fastapi import APIRouter
from database import SessionLocal
import models
import math


router = APIRouter(
    prefix="/allocation",
    tags=["Allocation"]
)

active_allocations = {}

def parse_required_resources(raw):
    """
    Convert resources_required into a clean list.

    Example:
    "ambulance,rescue_team,medicine"

    becomes:

    ["ambulance", "rescue_team", "medicine"]
    """

    if not raw:
        return []

    if isinstance(raw, list):
        return [
            str(item).strip().lower()
            for item in raw
            if str(item).strip()
        ]

    return [
        item.strip().lower()
        for item in str(raw).split(",")
        if item.strip()
    ]

def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two GPS coordinates in km
    using the Haversine formula.
    """

    R = 6371

    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a)
    )

    return R * c

def severity_score(severity):
    """
    Convert incident severity into a numerical score.
    """

    scores = {
        "critical": 100,
        "high": 75,
        "medium": 50,
        "low": 25
    }

    return scores.get(
        str(severity).lower(),
        25
    )

def resource_match(resource_type, incident):
    """
    Check whether a resource matches the incident's needs.
    """

    required = parse_required_resources(
        incident.resources_required
    )

    resource_type = str(
        resource_type
    ).lower()

    return resource_type in required

def calculate_incident_priority(incident):
    """
    Calculate incident priority from:

    - severity
    - people affected
    - injured people

    Maximum score = 100
    """

    priority = (
        severity_score(
            incident.severity
        )
        + min(
            incident.people_affected,
            100
        ) * 0.25
        + min(
            incident.injured,
            20
        ) * 2
    )

    return min(
        round(priority, 2),
        100
    )

def calculate_required_quantities(incident):
    """
    Estimate how many resources are required.
    """

    required = parse_required_resources(
        incident.resources_required
    )

    quantities = {}

    if "ambulance" in required:

        quantities["ambulance"] = max(
            1,
            math.ceil(
                incident.injured / 4
            )
        )

    if "rescue_team" in required:

        quantities["rescue_team"] = max(
            1,
            math.ceil(
                incident.people_affected / 25
            )
        )

    if "medicine" in required:

        quantities["medicine"] = max(
            10,
            incident.injured * 5
        )

    if "food" in required:

        quantities["food"] = max(
            20,
            incident.people_affected * 2
        )

    if "water" in required:

        quantities["water"] = max(
            20,
            incident.people_affected * 2
        )

    return quantities

@router.get("/{incident_id}")
def allocate_resources(incident_id: int):

    db = SessionLocal()

    incident = (
        db.query(models.Incident)
        .filter(
            models.Incident.id == incident_id
        )
        .first()
    )

    if not incident:

        db.close()

        return {
            "error": "Incident not found"
        }

    resources = (
        db.query(models.Resource)
        .filter(
            models.Resource.status == "available"
        )
        .all()
    )

    priority = calculate_incident_priority(
        incident
    )

    required = parse_required_resources(
        incident.resources_required
    )

    recommendations = []

    for resource in resources:

        distance = calculate_distance(
            incident.latitude,
            incident.longitude,
            resource.latitude,
            resource.longitude
        )

        matched = resource_match(
            resource.type,
            incident
        )

        distance_penalty = distance * 5

        match_bonus = (
            30
            if matched
            else 0
        )

        allocation_score = (
            priority
            + match_bonus
            - distance_penalty
        )

        recommendations.append(
            {
                "resource_id": resource.id,
                "type": resource.type,
                "quantity": resource.quantity,
                "status": resource.status,
                "distance_km": round(
                    distance,
                    2
                ),
                "matched_need": matched,
                "allocation_score": round(
                    allocation_score,
                    2
                )
            }
        )

    recommendations.sort(
        key=lambda x: (
            not x["matched_need"],
            x["distance_km"]
        )
    )

    db.close()

    return {
        "incident_id": incident.id,
        "incident_severity": incident.severity,
        "people_affected": incident.people_affected,
        "injured": incident.injured,
        "priority_score": priority,
        "required_resources": required,
        "recommended_resources": recommendations
    }


@router.post("/{incident_id}/deploy")
def deploy_resources(incident_id: int):

    db = SessionLocal()

    incident = (
        db.query(models.Incident)
        .filter(
            models.Incident.id == incident_id
        )
        .first()
    )

    if not incident:

        db.close()

        return {
            "error": "Incident not found"
        }

    resources = (
        db.query(models.Resource)
        .filter(
            models.Resource.status == "available"
        )
        .all()
    )

    priority = calculate_incident_priority(
        incident
    )

    required_quantities = (
        calculate_required_quantities(
            incident
        )
    )

    allocated = []
    shortages = []

    incident_allocations = active_allocations.get(
        incident.id,
        []
    )


    for resource_type, needed in required_quantities.items():

        candidates = []

        for resource in resources:

            if resource.status != "available":
                continue

            if resource.type.lower() != resource_type:
                continue

            distance = calculate_distance(
                incident.latitude,
                incident.longitude,
                resource.latitude,
                resource.longitude
            )

            candidates.append(
                (
                    distance,
                    resource
                )
            )

        candidates.sort(
            key=lambda x: x[0]
        )

        allocated_quantity = 0

        for distance, resource in candidates:

            if allocated_quantity >= needed:
                break

            resource.status = "deployed"

            allocated_quantity += (
                resource.quantity
            )

            incident_allocations.append(
                resource.id
            )

            allocated.append(
                {
                    "resource_id": resource.id,
                    "type": resource.type,
                    "quantity": resource.quantity,
                    "distance_km": round(
                        distance,
                        2
                    ),
                    "status": resource.status
                }
            )

        shortage = max(
            0,
            needed - allocated_quantity
        )

        if shortage > 0:

            shortages.append(
                {
                    "resource_type": resource_type,
                    "required": needed,
                    "allocated": allocated_quantity,
                    "shortage": shortage
                }
            )

    active_allocations[
        incident.id
    ] = incident_allocations

    db.commit()

    result = {
        "message": (
            "Resources allocated successfully"
        ),
        "incident_id": incident.id,
        "priority_score": priority,
        "allocated_resources": allocated,
        "shortages": shortages,
        "allocation_complete": (
            len(shortages) == 0
        )
    }

    db.close()

    return result
