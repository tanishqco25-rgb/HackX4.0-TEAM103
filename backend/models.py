from sqlalchemy import Column, Integer, Float, String, Text
from database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    severity = Column(String, nullable=False)

    people_affected = Column(Integer, default=0)
    injured = Column(Integer, default=0)

    resources_required = Column(Text, nullable=True)

    status = Column(String, default="active")


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)

    type = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    status = Column(String, default="available")

    quantity = Column(Integer, default=1)

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    total_beds = Column(Integer, default=0)
    available_beds = Column(Integer, default=0)

    status = Column(String, default="operational")    

class Shelter(Base):
    __tablename__ = "shelters"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    capacity = Column(Integer, default=0)
    available_capacity = Column(Integer, default=0)

    status = Column(String, default="operational")    