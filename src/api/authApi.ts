import { api } from "./axiosInstance";


export const signupUser = async (
  orgName: string,
  name: string,
  email: string,
  password: string
) => {
  return api.post("/auth/signup", {
    orgName,
    name,
    email,
    password,
  });
};

export const loginUser = async (
  email: string,
  password: string
) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};

export const logoutUser = async () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

