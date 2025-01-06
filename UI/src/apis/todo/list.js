import { apiConnector } from "../axiosInstace";  

export const listTodos = async (token) => {
  try {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const response = await apiConnector("GET", "/todo", null, headers); 
    return response.data; 
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};
