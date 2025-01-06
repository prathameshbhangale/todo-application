import { apiConnector } from "../axiosInstace";  

export const addTodo = async (body, token) => {
  try {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const response = await apiConnector("POST", "/todo/add", body, headers);
    return response.data; // Return the response data after adding the todo
  } catch (error) {
    console.log("Error adding todo:", error);
  }
};
