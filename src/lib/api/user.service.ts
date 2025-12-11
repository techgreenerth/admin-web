import apiClient from "./axios";

export interface CreateUserDto {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
  experience?: string;
  proficiencyTestPassed?: boolean;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  organizationName?: string;
  experience?: string;
  status?: string;
  proficiencyTestPassed?: boolean;
}

export interface User {
  id: string;
  userCode: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  status: string;
  organizationName?: string;
  experience?: string;
  proficiencyTestPassed: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserListResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const userService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<UserListResponse> {
    const response = await apiClient.get<UserListResponse>("/v1/users", {
      params,
    });
    return response.data;
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/v1/users/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto): Promise<User> {
    const response = await apiClient.post<User>("/v1/auth/user/register", data);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<User>(`/v1/users/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/v1/users/${id}`);
  },
};
