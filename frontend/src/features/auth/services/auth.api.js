import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
  withCredentials: true,
});

export const loginUser = async (username, password) => {
  const response = await instance.post("/login", {
    username,
    password,
  });

  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await instance.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const response = await instance.get("/get-me");
  return response.data;
};

export const logoutUser= async () =>{
  const response= await instance.get("/logout");
  return response.data;
}
