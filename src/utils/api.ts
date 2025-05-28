import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2828/api/v1",
});
