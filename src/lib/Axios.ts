import axios from "axios";

// json-server runs on this port (see package.json script below)
export const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 2000,
});