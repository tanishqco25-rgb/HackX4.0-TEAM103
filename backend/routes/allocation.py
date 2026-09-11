from fastapi import APIRouter
from database import SessionLocal
import models
import math

router = APIRouter(
    prefix="/allocation",
    tags=["Allocation"]
)


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate approximate distance between two GPS coordinates in km.
    Uses the Haversine formula.
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


def parse_required_resources(resources_required):
    """
    Convert the incident resource requirement into
    a clean list.

    Example:

    "ambulance,rescue_team,medicine"

    becomes:

    ["ambulance", "rescue_team", "medicine"]
    """

    if not resources_required:
        return []

    if isinstance(resources_required, list):
        return [
            str(item).strip().lower()
            for item in resources_required
        ]

    return [
        item.strip().lower()
        for item in str(resources_required).split(",")
        if item.strip()
    ]


def resource_match(resource_type, incident):
    """
    Decide whether a resource is relevant
    to the incident.
    """

    required = parse_required_resources(
        incident.resources_required
    )

    resource_type = str(
        resource_type
    ).lower().strip()

    if resource_type in required:
        return True

    if (
        resource_type == "rescue team"
        and "rescue_team" in required
    ):
        return True

    if (
        resource_type == "rescue_team"
        and "rescue team" in required
    ):
        return True

    if (
        resource_type == "ambulance"
        and incident.injured > 0
    ):
        return True

    return False


def calculate_incident_priority(incident):
    """
    Calculate incident priority.

    Final score is capped at 100.
    """

    score = (
        severity_score(incident.severity)
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
        round(score, 2),
        100
    )


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

    incident_priority = calculate_incident_priority(
        incident
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


        match_bonus = 30 if matched else 0

        distance_penalty = distance * 5

        allocation_score = (
            incident_priority
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
        "priority_score": incident_priority,
        "required_resources": parse_required_resources(
            incident.resources_required
        ),
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

    required = parse_required_resources(
        incident.resources_required
    )

    priority = calculate_incident_priority(
        incident
    )

    allocated = []
    shortages = []


    required_quantities = {}

    if "ambulance" in required:

        required_quantities["ambulance"] = max(
            1,
            math.ceil(
                incident.injured / 4
            )
        )

    if "rescue_team" in required:

        required_quantities["rescue_team"] = max(
            1,
            math.ceil(
                incident.people_affected / 25
            )
        )

    if "medicine" in required:

        required_quantities["medicine"] = max(
            10,
            incident.injured * 5
        )

    if "food" in required:

        required_quantities["food"] = max(
            20,
            incident.people_affected * 2
        )

    if "water" in required:

        required_quantities["water"] = max(
            20,
            incident.people_affected * 2
        )

    for resource_type in required:

        needed = required_quantities.get(
            resource_type,
            1
        )

        matching_resources = []

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

            matching_resources.append(
                (
                    distance,
                    resource
                )
            )

        matching_resources.sort(
            key=lambda x: x[0]
        )

        allocated_quantity = 0

        for distance, resource in matching_resources:

            if allocated_quantity >= needed:
                break

            resource.status = "deployed"

            allocated_quantity += resource.quantity

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


        if allocated_quantity < needed:

            shortages.append(
                {
                    "resource_type": resource_type,
                    "required": needed,
                    "allocated": allocated_quantity,
                    "shortage": (
                        needed
                        - allocated_quantity
                    )
                }
            )

   
    db.commit()

    result = {
        "message": "Resources allocated successfully",
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
