import apiClient from "./axios";

export interface CreateAdminDto {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface UpdateAdminDto {
  email?: string;
  phone?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
}

export interface Admin {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminListResponse {
  data: Admin[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const adminService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<AdminListResponse> {
    const response = await apiClient.get<AdminListResponse>("/v1/admin", {
      params,
    });
    return response.data;
  },

  async getById(id: string): Promise<Admin> {
    const response = await apiClient.get<Admin>(`/v1/admin/${id}`);
    return response.data;
  },

  async create(data: CreateAdminDto): Promise<Admin> {
    const response = await apiClient.post<Admin>("/v1/auth/admin/register", data);
    return response.data;
  },

  async update(id: string, data: UpdateAdminDto): Promise<Admin> {
    const response = await apiClient.patch<Admin>(`/v1/admin/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/${id}`);
  },
};
