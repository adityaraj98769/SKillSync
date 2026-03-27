import axios from "axios";

// API URL (Production + Development support)
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Debug logs (remove later if needed)
console.log("[Backend Config] API URL:", API_URL);
console.log("[Backend Config] Environment:", import.meta.env.MODE);

// Axios instance
const API = axios.create({
  baseURL: API_URL,
  timeout: 60000 // important (Render slow hota hai free tier me)
});

// Generic error handler (🔥 important)
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error?.response || error.message);
    throw error;
  }
};

// APIs

export const analyzeResume = async (formData) =>
  handleRequest(API.post("/analyze", formData));

export const generateCoverLetter = async (data) =>
  handleRequest(
    API.post("/cover-letter/quick", {
      user_name: data.userName || "Candidate",
      job_title: data.jobTitle,
      company_name: data.companyName,
      skills: data.skills,
      experience_years: parseInt(data.experienceYears) || 0
    })
  );

export const getInterviewPrep = async (data) =>
  handleRequest(API.post("/interview-prep", data));

export const getSalaryInsights = async (data) =>
  handleRequest(API.post("/salary-insights", data));

export const searchJobs = async (data) =>
  handleRequest(API.post("/jobs/search", data));

export const searchInternships = async (keywords, location) =>
  handleRequest(
    API.post("/internships/search", { keywords, location })
  );

export const getCareerAdvice = async (data) =>
  handleRequest(API.post("/chat", data));

export const getCareerAdviceWithFile = async (formData) =>
  handleRequest(
    API.post("/chat/with-file", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  );

export default API;