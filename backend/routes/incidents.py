from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import Incident


router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)


class IncidentCreate(BaseModel):
    latitude: float
    longitude: float
    severity: str
    people_affected: int = 0
    injured: int = 0
    resources_required: str | None = None
    status: str = "active"


@router.post("/")
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    new_incident = Incident(
        latitude=incident.latitude,
        longitude=incident.longitude,
        severity=incident.severity,
        people_affected=incident.people_affected,
        injured=incident.injured,
        resources_required=incident.resources_required,
        status=incident.status
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return {
        "message": "Incident created successfully",
        "incident": {
            "id": new_incident.id,
            "latitude": new_incident.latitude,
            "longitude": new_incident.longitude,
            "severity": new_incident.severity,
            "people_affected": new_incident.people_affected,
            "injured": new_incident.injured,
            "resources_required": new_incident.resources_required,
            "status": new_incident.status
        }
    }


@router.get("/")
def get_incidents(db: Session = Depends(get_db)):
    incidents = db.query(Incident).all()

    return incidents