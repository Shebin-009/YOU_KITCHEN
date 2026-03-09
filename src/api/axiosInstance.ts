import axios from "axios";

export const api = axios.create({
  baseURL: "https://youkitchen.co.uk/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});
