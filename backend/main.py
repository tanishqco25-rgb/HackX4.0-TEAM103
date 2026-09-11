from fastapi import FastAPI

from database import engine, Base
import models

from routes.resources import router as resources_router
from routes.incidents import router as incidents_router
from routes.allocation import router as allocation_router
from routes.ai import router as ai_router
from routes.simulation import router as simulation_router
from routes.equity import router as equity_router


# Create database tables
Base.metadata.create_all(bind=engine)


# Seed demo data
from database import seed_database

seed_database()


# Create FastAPI application
app = FastAPI(
    title="ResQAI Backend",
    version="1.0.0"
)


# Register API routers
app.include_router(resources_router)
app.include_router(incidents_router)
app.include_router(allocation_router)
app.include_router(ai_router)
app.include_router(simulation_router)
app.include_router(equity_router)


# Root endpoint
@app.get("/")
def root():
    return {
        "message": "ResQAI Backend is running",
        "status": "online",
        "version": "1.0.0"
    }