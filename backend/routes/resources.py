from fastapi import APIRouter
from pydantic import BaseModel
from database import SessionLocal
import models


router = APIRouter(
    prefix="/resources",
    tags=["Resources"]
)


# =========================================================
# RESOURCE SCHEMA
# =========================================================

class ResourceCreate(BaseModel):
    type: str
    latitude: float
    longitude: float
    status: str = "available"
    quantity: int = 1


# =========================================================
# GET ALL RESOURCES
# =========================================================

@router.get("/")
def get_resources():

    db = SessionLocal()

    resources = db.query(models.Resource).all()

    result = []

    for resource in resources:
        result.append({
            "id": resource.id,
            "type": resource.type,
            "latitude": resource.latitude,
            "longitude": resource.longitude,
            "status": resource.status,
            "quantity": resource.quantity
        })

    db.close()

    return result


# =========================================================
# CREATE RESOURCE
# =========================================================

@router.post("/")
def create_resource(resource_data: ResourceCreate):

    db = SessionLocal()

    resource = models.Resource(
        type=resource_data.type,
        latitude=resource_data.latitude,
        longitude=resource_data.longitude,
        status=resource_data.status,
        quantity=resource_data.quantity
    )

    db.add(resource)
    db.commit()
    db.refresh(resource)

    result = {
        "id": resource.id,
        "type": resource.type,
        "latitude": resource.latitude,
        "longitude": resource.longitude,
        "status": resource.status,
        "quantity": resource.quantity
    }

    db.close()

    return result


# =========================================================
# GET ALL HOSPITALS
# =========================================================

@router.get("/hospitals")
def get_hospitals():

    db = SessionLocal()

    hospitals = db.query(models.Hospital).all()

    result = []

    for hospital in hospitals:
        result.append({
            "id": hospital.id,
            "name": hospital.name,
            "latitude": hospital.latitude,
            "longitude": hospital.longitude,
            "total_beds": hospital.total_beds,
            "available_beds": hospital.available_beds,
            "status": hospital.status
        })

    db.close()

    return result


# =========================================================
# GET ALL SHELTERS
# =========================================================

@router.get("/shelters")
def get_shelters():

    db = SessionLocal()

    shelters = db.query(models.Shelter).all()

    result = []

    for shelter in shelters:
        result.append({
            "id": shelter.id,
            "name": shelter.name,
            "latitude": shelter.latitude,
            "longitude": shelter.longitude,
            "capacity": shelter.capacity,
            "available_capacity": shelter.available_capacity,
            "status": shelter.status
        })

    db.close()

    return result