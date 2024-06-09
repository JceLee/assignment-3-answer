// src/api/auth.js
import axiosInstance from "./axiosJWT.js";
import useAuthStore from "../../store/authStore.js";

export const register = async (id, password, nickname) => {
  try {
    const response = await axiosInstance.post("/register", {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (id, password, expiresIn = "1h") => {
  try {
    const response = await axiosInstance.post(`/login?expiresIn=${expiresIn}`, {
      id,
      password,
    });
    const { accessToken, userId, avatar, nickname } = response.data;
    const user = { id: userId, avatar, nickname };
    useAuthStore.getState().login(accessToken, user);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const updateProfile = async (imgFile, nickname) => {
  try {
    const formData = new FormData();
    if (imgFile) formData.append("avatar", imgFile);
    if (nickname) formData.append("nickname", nickname);

    const response = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
