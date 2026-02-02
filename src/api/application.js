import { dummyApplications } from "@/utils/constant";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a mutable copy of applications for state management
let applicationsData = JSON.parse(JSON.stringify(dummyApplications));

export async function fetchApplications() {
  await delay(300);
  return [...applicationsData];
}

export async function fetchApplicationById(id) {
  await delay(200);
  const application = applicationsData.find((app) => app.id === Number(id));
  if (!application) {
    throw new Error("Application not found");
  }
  return { ...application };
}

export async function updateApplicationStatus(applicationId, newStatus) {
  await delay(300);
  const applicationIndex = applicationsData.findIndex((app) => app.id === applicationId);
  if (applicationIndex === -1) {
    throw new Error("Application not found");
  }
  // Update the application in the data array
  applicationsData[applicationIndex] = {
    ...applicationsData[applicationIndex],
    status: newStatus,
  };
  // Return the updated application
  return { ...applicationsData[applicationIndex] };
}

export async function updateApplicationNote(applicationId, note) {
  await delay(300);
  const applicationIndex = applicationsData.findIndex((app) => app.id === applicationId);
  if (applicationIndex === -1) {
    throw new Error("Application not found");
  }
  // Update the application in the data array
  applicationsData[applicationIndex] = {
    ...applicationsData[applicationIndex],
    internalNote: note,
  };
  // Return the updated application
  return { ...applicationsData[applicationIndex] };
}
