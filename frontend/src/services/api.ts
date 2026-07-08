import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const getDashboardChecklist = async () => {
  const res = await api.get(
      "/checklist/dashboard"
  );

  return res.data;
};