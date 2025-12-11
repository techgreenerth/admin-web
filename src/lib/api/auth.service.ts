import apiClient from "./axios";
import { LoginCredentials, AuthResponse } from "@/types/auth.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/v1/auth/admin/login",
      credentials
    );
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  getStoredToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  getStoredUser(): AuthResponse["user"] | null {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  },

  setAuthData(data: AuthResponse): void {
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },
};
