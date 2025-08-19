import api from "@/lib/axiosConfig";
import { LoginResponse } from "@/types/response/login-response";

export const login = async (data : LoginRequest) : Promise<LoginResponse> =>  {
    const response = await api.post("/auth/login", data);
    return response as unknown as LoginResponse;
}
