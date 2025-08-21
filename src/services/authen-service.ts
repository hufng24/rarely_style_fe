import api from "@/lib/axiosConfig";
import { LoginResponse } from "@/types/response/login-response";

export const login = async (data : LoginRequest) : Promise<LoginResponse> =>  {
    const response = await api.post("/auth/login", data);
    return response as unknown as LoginResponse;
}

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register failed");
  }
};
