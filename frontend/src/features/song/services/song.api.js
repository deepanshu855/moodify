import axios from "axios";

const instance = axios.create({
  baseURL: "https://moodify-etat.onrender.com/api",
  withCredentials: true,
});

export const uploadSong = async (mood, song) => {
  const formData = new FormData();

  const response = await instance.post("/songs", formData);
  return response.data;
};

export const getSong = async ({ mood }) => {
  const response = await instance.get(`/songs?mood=${mood}`);
  return response.data;
};

export const getPlaylist = async ({ mood }) => {
  const response = await instance.get(`/songs/playlist?mood=${mood}`);
  return response.data;
};
