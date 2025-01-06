import { apiConnector } from "../axiosInstace";

export const login = async (email, password) => {
  try {
    const response = await apiConnector("POST", "/auth/login", {
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.log("Login Error:", error);
  }
};
