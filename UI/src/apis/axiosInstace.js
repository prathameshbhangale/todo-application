import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


const HttpMethod = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export const apiConnector = async (
  method,
  url,
  bodyData = {},
  headers = {},
  params = {}
) => {
  if (!HttpMethod.includes(method)) {
    throw new Error("Invalid HTTP method");
  }

  const config = {
    method,
    url,
    data: bodyData,
    headers: { ...headers },
    params: { ...params },
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    console.log(error)
  }
};