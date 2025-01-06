import { apiConnector } from "../axiosInstace";

export const register = async (name, email, password) => {
  try {
    const response = await apiConnector("POST", "/auth/register", {
      name,
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.log("Registration Error:", error);
  }
};
