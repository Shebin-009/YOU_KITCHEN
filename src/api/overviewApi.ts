import { api } from "./axiosInstance";

export const getOverview = async () => {
  return api.get("/auth/org/overview");
};
