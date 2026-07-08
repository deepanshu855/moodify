import axios from "axios";

const instance = axios.create({
  baseURL: "https://moodify-etat.onrender.com/api",
  withCredentials: true,
});

export const getHistory = async () => {
  const response = await instance.get("/history");
  return response.data;
};

export const createHistory = async (mood) => {
  console.log(mood);
  const response = await instance.post("/history", { mood });
  return response.data;
};
