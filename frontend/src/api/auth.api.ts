import { http } from "./http";

interface LoginData { email: string; password: string; }

interface LoginResponse { data: { message: string }; error: null; }

export const loginRequest = async (data: LoginData): Promise<LoginResponse> => {
  const res = await http.post("/auth/login", data);
  return res.data;
};