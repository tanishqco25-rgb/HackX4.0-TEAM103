from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter(
    prefix="/ai",
    tags=["AI Analysis"]
)


class IncidentReport(BaseModel):
    report: str


def analyze_report(report: str):

    text = report.lower()

    people_affected = 0

    people_patterns = [
        r"(\d+)\s*(?:people|persons|people are|persons are)",
        r"(\d+)\s*(?:people affected|persons affected)",
        r"around\s+(\d+)\s*people",
        r"about\s+(\d+)\s*people"
    ]

    for pattern in people_patterns:
        match = re.search(pattern, text)
        if match:
            people_affected = int(match.group(1))
            break
            
    injured = 0

    injured_patterns = [
        r"(\d+)\s*(?:injured|injuries)",
        r"(\d+)\s*(?:people injured|persons injured)"
    ]

    for pattern in injured_patterns:
        match = re.search(pattern, text)
        if match:
            injured = int(match.group(1))
            break

    severity = "medium"

    critical_words = [
        "trapped",
        "critical",
        "severe",
        "life threatening",
        "life-threatening",
        "collapsed",
        "collapse",
        "multiple injured",
        "rising water",
        "fire",
        "explosion"
    ]

    high_words = [
        "injured",
        "flood",
        "heavy damage",
        "major damage",
        "stranded",
        "rescue required",
        "urgent"
    ]

    if any(word in text for word in critical_words):
        severity = "critical"

    elif any(word in text for word in high_words):
        severity = "high"

    resources = []

    if any(word in text for word in [
        "injured",
        "ambulance",
        "medical",
        "hospital"
    ]):
        resources.append("ambulance")

    if any(word in text for word in [
        "trapped",
        "rescue",
        "stranded",
        "collapsed"
    ]):
        resources.append("rescue_team")

    if any(word in text for word in [
        "medicine",
        "medical supplies",
        "medicines"
    ]):
        resources.append("medicine")

    if any(word in text for word in [
        "water",
        "thirst",
        "drinking water"
    ]):
        resources.append("water")

    if any(word in text for word in [
        "food",
        "hungry",
        "starving"
    ]):
        resources.append("food")

    priority = 30

    if people_affected >= 100:
        priority += 25
    elif people_affected >= 50:
        priority += 20
    elif people_affected >= 20:
        priority += 10
    elif people_affected > 0:
        priority += 5

 
    priority += min(injured * 3, 20)

 
    if severity == "critical":
        priority += 25
    elif severity == "high":
        priority += 15
    else:
        priority += 5

    priority = min(priority, 100)

    ambulances_required = 0
    rescue_teams_required = 0
    medicine_required = 0

    if "ambulance" in resources:
        ambulances_required = max(1, (injured + 3) // 4)

    if "rescue_team" in resources:
        rescue_teams_required = max(1, (people_affected + 24) // 25)

    if "medicine" in resources:
        medicine_required = max(10, injured * 5)

    return {
        "people_affected": people_affected,
        "injured": injured,
        "severity": severity,
        "priority": priority,
        "resources_required": resources,
        "ambulances_required": ambulances_required,
        "rescue_teams_required": rescue_teams_required,
        "medicine_required": medicine_required
    }


@router.post("/analyze")
def analyze_incident(report: IncidentReport):

    analysis = analyze_report(report.report)

    return {
        "message": "Incident analyzed successfully",
        "analysis": analysis
    }
