import create from "zustand";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  token: localStorage.getItem("accessToken") || null,
  user: getUserFromLocalStorage(),
  login: (token, user) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ isLoggedIn: true, token, user });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({ isLoggedIn: false, token: null, user: null });
  },
}));

export default useAuthStore;
