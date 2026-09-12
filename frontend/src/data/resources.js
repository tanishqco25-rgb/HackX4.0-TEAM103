export const resourceTypes = ["Ambulance", "Rescue Team", "Medical Team", "Food Supply", "Water Supply", "Medicine Kit", "Rescue Equipment", "Shelter"];
export const resourceStatuses = ["Available", "Deployed", "En Route", "Unavailable", "Maintenance"];
export const resourceConditions = ["Excellent", "Good", "Needs Attention", "Critical"];
export const resourceZones = ["Zone Alpha", "Zone Beta", "Zone Gamma", "Zone Delta", "Zone Echo"];

export const resourceCategories = [
  { name: "Ambulances", icon: "ambulance", total: 24, available: 8, deployed: 12, enRoute: 4, utilisation: 67 },
  { name: "Rescue Teams", icon: "rescue", total: 18, available: 5, deployed: 9, enRoute: 4, utilisation: 72 },
  { name: "Medical Teams", icon: "medical", total: 21, available: 6, deployed: 11, enRoute: 4, utilisation: 71 },
  { name: "Food Supplies", icon: "food", total: 16, available: 7, deployed: 7, enRoute: 2, utilisation: 56 },
  { name: "Water Supplies", icon: "water", total: 14, available: 5, deployed: 7, enRoute: 2, utilisation: 64 },
  { name: "Medicine Kits", icon: "medicine", total: 12, available: 4, deployed: 7, enRoute: 1, utilisation: 67 },
  { name: "Rescue Equipment", icon: "equipment", total: 11, available: 4, deployed: 5, enRoute: 2, utilisation: 64 },
  { name: "Shelters", icon: "shelter", total: 8, available: 3, deployed: 0, enRoute: 0, utilisation: 62 },
];

export const resources = [
  { id: "AMB-A12", type: "Ambulance", location: "Zone Beta", status: "En Route", zone: "Zone Alpha", capacity: "4 patients", condition: "Good", eta: "8 min", deploymentTime: "08:42 UTC", incident: "INC-1042", operator: "M. Santos", notes: "Transporting two injured civilians to the nearest medical facility." },
  { id: "AMB-A09", type: "Ambulance", location: "Zone Gamma", status: "Available", zone: "Zone Gamma", capacity: "4 patients", condition: "Excellent", eta: "Ready", deploymentTime: "-", incident: "None", operator: "K. Nair", notes: "Staged at the central response hub." },
  { id: "AMB-A06", type: "Ambulance", location: "Zone Delta", status: "Deployed", zone: "Zone Delta", capacity: "4 patients", condition: "Good", eta: "On site", deploymentTime: "08:11 UTC", incident: "INC-1031", operator: "R. Cole", notes: "Providing patient transport from the residential assessment area." },
  { id: "AMB-A03", type: "Ambulance", location: "Zone Echo", status: "Maintenance", zone: "Zone Echo", capacity: "4 patients", condition: "Needs Attention", eta: "-", deploymentTime: "-", incident: "None", operator: "Service Bay 2", notes: "Routine brake inspection in progress." },
  { id: "RST-R07", type: "Rescue Team", location: "Zone Alpha", status: "En Route", zone: "Zone Delta", capacity: "8 responders", condition: "Excellent", eta: "12 min", deploymentTime: "08:36 UTC", incident: "INC-1041", operator: "Team Lead J. Park", notes: "Moving with structural search equipment to the east corridor." },
  { id: "RST-R04", type: "Rescue Team", location: "Zone Gamma", status: "Available", zone: "Zone Gamma", capacity: "8 responders", condition: "Good", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Team Lead A. Khan", notes: "Available for high-priority structural response." },
  { id: "RST-R02", type: "Rescue Team", location: "Zone Beta", status: "Deployed", zone: "Zone Beta", capacity: "8 responders", condition: "Good", eta: "On site", deploymentTime: "07:50 UTC", incident: "INC-1026", operator: "Team Lead L. Chen", notes: "Perimeter secured around the unstable structure." },
  { id: "MED-M03", type: "Medical Team", location: "Zone Delta", status: "En Route", zone: "Zone Beta", capacity: "18 patients", condition: "Excellent", eta: "15 min", deploymentTime: "08:31 UTC", incident: "INC-1038", operator: "Dr. I. Mensah", notes: "Travelling with triage beds and emergency medicine kits." },
  { id: "MED-M01", type: "Medical Team", location: "Zone Echo", status: "Deployed", zone: "Zone Echo", capacity: "12 patients", condition: "Good", eta: "On site", deploymentTime: "08:18 UTC", incident: "INC-1035", operator: "Dr. S. Rao", notes: "Monitoring smoke exposure and minor injuries." },
  { id: "MED-M04", type: "Medical Team", location: "Zone Gamma", status: "Available", zone: "Zone Gamma", capacity: "18 patients", condition: "Excellent", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Dr. E. Morris", notes: "Ready for shelter or field triage assignment." },
  { id: "FOD-F11", type: "Food Supply", location: "Central Hub", status: "Deployed", zone: "Zone Alpha", capacity: "600 portions", condition: "Good", eta: "On site", deploymentTime: "07:45 UTC", incident: "INC-1042", operator: "Logistics Unit 3", notes: "Distribution point active at the west shelter." },
  { id: "FOD-F14", type: "Food Supply", location: "Zone Beta", status: "Available", zone: "Zone Beta", capacity: "400 portions", condition: "Excellent", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Logistics Unit 5", notes: "Packed and ready for dispatch." },
  { id: "WTR-W02", type: "Water Supply", location: "Zone Echo", status: "En Route", zone: "Zone Gamma", capacity: "1,200 litres", condition: "Good", eta: "9 min", deploymentTime: "08:49 UTC", incident: "INC-1036", operator: "Supply Driver T. Bell", notes: "Potable water delivery for the flooded residential blocks." },
  { id: "WTR-W06", type: "Water Supply", location: "Central Hub", status: "Available", zone: "Zone Delta", capacity: "1,000 litres", condition: "Excellent", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Supply Unit 6", notes: "Sealed reserve stock." },
  { id: "MED-K08", type: "Medicine Kit", location: "Zone Alpha", status: "Deployed", zone: "Zone Alpha", capacity: "40 kits", condition: "Good", eta: "On site", deploymentTime: "08:38 UTC", incident: "INC-1042", operator: "Medical Logistics", notes: "Trauma supplies supporting the active triage point." },
  { id: "MED-K12", type: "Medicine Kit", location: "Central Hub", status: "Available", zone: "Zone Gamma", capacity: "60 kits", condition: "Excellent", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Medical Logistics", notes: "Ready for immediate dispatch." },
  { id: "EQP-E05", type: "Rescue Equipment", location: "Zone Delta", status: "Unavailable", zone: "Zone Delta", capacity: "Heavy lift set", condition: "Critical", eta: "-", deploymentTime: "-", incident: "INC-1041", operator: "Equipment Bay 1", notes: "Hydraulic spreader requires repair before deployment." },
  { id: "EQP-E09", type: "Rescue Equipment", location: "Zone Gamma", status: "Available", zone: "Zone Beta", capacity: "Cutting set", condition: "Good", eta: "Ready", deploymentTime: "-", incident: "None", operator: "Equipment Bay 2", notes: "Inspected and fuelled for structural response." },
  { id: "SHL-S01", type: "Shelter", location: "Civic Centre", status: "Deployed", zone: "Zone Alpha", capacity: "320 beds", condition: "Good", eta: "Open", deploymentTime: "06:30 UTC", incident: "INC-1042", operator: "Shelter Coordinator V. Singh", notes: "76% occupied; additional bedding is being prepared." },
  { id: "SHL-S04", type: "Shelter", location: "South School", status: "Available", zone: "Zone Echo", capacity: "220 beds", condition: "Excellent", eta: "Open", deploymentTime: "-", incident: "None", operator: "Shelter Coordinator N. Ward", notes: "Ready to receive displaced residents." },
];

export const resourceGaps = [
  { zone: "Zone Alpha", required: 7, available: 2, shortage: 5, priority: 94, status: "CRITICAL GAP" },
  { zone: "Zone Delta", required: 6, available: 3, shortage: 3, priority: 81, status: "HIGH GAP" },
  { zone: "Zone Beta", required: 5, available: 3, shortage: 2, priority: 68, status: "WATCH" },
];

export const resourceDistribution = [
  { zone: "Zone Alpha", resources: 32 },
  { zone: "Zone Beta", resources: 24 },
  { zone: "Zone Gamma", resources: 19 },
  { zone: "Zone Delta", resources: 14 },
  { zone: "Zone Echo", resources: 11 },
];