import { apiConnector } from "../axiosInstace";  

export const editTodo = async (todoId, body, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await apiConnector("POST", `/todo/edit`, body, headers, { todoId: todoId });
    return response.data; // Return the response data after editing the todo
  } catch (error) {
    console.log("Error editing todo:", error);
  }
};
