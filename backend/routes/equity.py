from fastapi import APIRouter
from database import SessionLocal
import models

router = APIRouter(
    prefix="/equity",
    tags=["Equity Analysis"]
)


@router.get("/")
def get_equity():

    db = SessionLocal()

    incidents = db.query(models.Incident).all()
    resources = db.query(models.Resource).all()

    db.close()

    # Demo disaster zones
    zones = {
        "Zone A": {
            "min_lat": 26.90,
            "max_lat": 26.93,
            "min_lon": 75.76,
            "max_lon": 75.79
        },
        "Zone B": {
            "min_lat": 26.90,
            "max_lat": 26.93,
            "min_lon": 75.79,
            "max_lon": 75.82
        },
        "Zone C": {
            "min_lat": 26.93,
            "max_lat": 26.96,
            "min_lon": 75.76,
            "max_lon": 75.79
        },
        "Zone D": {
            "min_lat": 26.93,
            "max_lat": 26.96,
            "min_lon": 75.79,
            "max_lon": 75.82
        }
    }

    results = []

    for zone_name, zone in zones.items():

        zone_incidents = []

        for incident in incidents:

            if (
                zone["min_lat"] <= incident.latitude <= zone["max_lat"]
                and
                zone["min_lon"] <= incident.longitude <= zone["max_lon"]
            ):
                zone_incidents.append(incident)

        # Calculate disaster need
        need_score = 0

        for incident in zone_incidents:

            severity_score = {
                "critical": 50,
                "high": 35,
                "medium": 20,
                "low": 10
            }.get(
                incident.severity.lower(),
                10
            )

            need_score += (
                severity_score
                + incident.people_affected * 0.4
                + incident.injured * 2
            )

        # Count usable resources in zone
        zone_resources = 0

        for resource in resources:

            if (
                zone["min_lat"] <= resource.latitude <= zone["max_lat"]
                and
                zone["min_lon"] <= resource.longitude <= zone["max_lon"]
            ):
                if resource.status != "unavailable":
                    zone_resources += 1

        # Calculate coverage
        if need_score == 0:
            coverage = 100
        else:
            coverage = min(
                100,
                round((zone_resources * 20 / need_score) * 100)
            )

        # Determine service status
        if coverage >= 75:

            status = "well_served"

            recommendation = (
                "Resource coverage is adequate."
            )

        elif coverage >= 50:

            status = "moderately_served"

            recommendation = (
                "Consider deploying additional resources."
            )

        else:

            status = "underserved"

            extra_resources = max(
                1,
                int((need_score - zone_resources * 20) / 40)
            )

            recommendation = (
                f"Deploy approximately {extra_resources} "
                "additional emergency resources."
            )

        results.append({
            "zone": zone_name,
            "incidents": len(zone_incidents),
            "need_score": round(need_score, 2),
            "available_resources": zone_resources,
            "coverage_percent": coverage,
            "status": status,
            "recommendation": recommendation
        })

    # Show least-served zones first
    results.sort(
        key=lambda x: x["coverage_percent"]
    )

    return {
        "analysis": "Resource equity analysis",
        "zones": results,
        "priority_zone": results[0]["zone"] if results else None
    }