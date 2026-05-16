import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const http = axios.create({
  baseURL: API_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest" 
  }
});