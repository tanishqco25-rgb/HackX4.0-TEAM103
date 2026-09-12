from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./resqai.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def seed_database():
    """
    Add initial demo data to the database.
    Data is inserted only if the tables are empty.
    """

    # Import here to avoid circular imports
    import models

    db = SessionLocal()

    try:

        # --------------------------------------------------
        # HOSPITALS
        # --------------------------------------------------

        hospital_count = db.query(models.Hospital).count()

        if hospital_count == 0:

            hospitals = [

                models.Hospital(
                    name="City Emergency Hospital",
                    latitude=26.9124,
                    longitude=75.7873,
                    total_beds=100,
                    available_beds=72,
                    status="operational"
                ),

                models.Hospital(
                    name="General Hospital",
                    latitude=26.9050,
                    longitude=75.7950,
                    total_beds=150,
                    available_beds=98,
                    status="operational"
                ),

                models.Hospital(
                    name="Jaipur Trauma Center",
                    latitude=26.9200,
                    longitude=75.7750,
                    total_beds=80,
                    available_beds=35,
                    status="operational"
                )

            ]

            db.add_all(hospitals)


        # --------------------------------------------------
        # SHELTERS
        # --------------------------------------------------

        shelter_count = db.query(models.Shelter).count()

        if shelter_count == 0:

            shelters = [

                models.Shelter(
                    name="Community Relief Shelter",
                    latitude=26.9100,
                    longitude=75.7800,
                    capacity=500,
                    available_capacity=320,
                    status="operational"
                ),

                models.Shelter(
                    name="Government School Shelter",
                    latitude=26.9000,
                    longitude=75.8050,
                    capacity=300,
                    available_capacity=180,
                    status="operational"
                ),

                models.Shelter(
                    name="Emergency Relief Camp",
                    latitude=26.9250,
                    longitude=75.7650,
                    capacity=700,
                    available_capacity=510,
                    status="operational"
                )

            ]

            db.add_all(shelters)


        # --------------------------------------------------
        # RESOURCES
        # --------------------------------------------------

        resource_count = db.query(models.Resource).count()

        if resource_count == 0:

            resources = [

                models.Resource(
                    type="ambulance",
                    latitude=26.9070,
                    longitude=75.7820,
                    status="available",
                    quantity=1
                ),

                models.Resource(
                    type="ambulance",
                    latitude=26.9180,
                    longitude=75.7900,
                    status="available",
                    quantity=1
                ),

                models.Resource(
                    type="rescue_team",
                    latitude=26.9000,
                    longitude=75.7750,
                    status="available",
                    quantity=1
                ),

                models.Resource(
                    type="rescue_team",
                    latitude=26.9300,
                    longitude=75.7850,
                    status="available",
                    quantity=1
                ),

                models.Resource(
                    type="rescue_team",
                    latitude=26.9100,
                    longitude=75.8000,
                    status="available",
                    quantity=1
                ),

                models.Resource(
                    type="medicine",
                    latitude=26.9150,
                    longitude=75.7800,
                    status="available",
                    quantity=100
                ),

                models.Resource(
                    type="food",
                    latitude=26.9050,
                    longitude=75.8100,
                    status="available",
                    quantity=200
                )

            ]

            db.add_all(resources)


        # --------------------------------------------------
        # INCIDENTS
        # --------------------------------------------------

        incident_count = db.query(models.Incident).count()

        if incident_count == 0:

            incidents = [

                models.Incident(
                    latitude=26.9120,
                    longitude=75.7900,
                    severity="critical",
                    people_affected=70,
                    injured=8,
                    resources_required="ambulance,rescue_team,medicine",
                    status="active"
                ),

                models.Incident(
                    latitude=26.9000,
                    longitude=75.8000,
                    severity="high",
                    people_affected=45,
                    injured=4,
                    resources_required="rescue_team,food",
                    status="active"
                ),

                models.Incident(
                    latitude=26.9250,
                    longitude=75.7750,
                    severity="medium",
                    people_affected=25,
                    injured=2,
                    resources_required="medicine,food",
                    status="active"
                )

            ]

            db.add_all(incidents)


        # Save everything
        db.commit()

        print("======================================")
        print("ResQAI demo database initialized")
        print("Hospitals :", db.query(models.Hospital).count())
        print("Shelters  :", db.query(models.Shelter).count())
        print("Resources :", db.query(models.Resource).count())
        print("Incidents :", db.query(models.Incident).count())
        print("======================================")


    except Exception as e:

        db.rollback()

        print("Database seeding error:", e)

    finally:

        db.close()