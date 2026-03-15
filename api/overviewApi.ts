import { api } from "../api/axiosInstances";

export const getOverview = async () => {
  return api.get("/auth/org/overview");
};