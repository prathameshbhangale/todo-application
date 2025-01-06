import { apiConnector } from "../axiosInstace";  

export const deleteTodo = async (todoId, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
    const body= {}
    const response = await apiConnector("DELETE", `/todo`, body, headers,{ todoId:todoId });
    // console.log(response)
    return response.data; // Return the response data after deleting the todo
  } catch (error) {
    console.log("Error deleting todo:", error);
  }
};
