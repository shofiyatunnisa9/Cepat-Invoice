import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.18.139:2828/api/v1",
});
