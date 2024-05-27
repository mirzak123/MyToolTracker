import { Category } from "@/types/category";
import api from "@/config/axios";

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category>;
  createCategory(category: Category): Promise<void>;
  updateCategory(category: Category): Promise<void>;
  deleteCategory(id: number): Promise<void>;
}

export class CategoryService implements ICategoryService {
  public async getCategories(): Promise<Category[]> {
    const response = await api.get("/api/Categories");
    return response.data;
  }

  public async getCategory(id: number): Promise<Category> {
    const response = await api.get(`/api/Categories/${id}`);
    return response.data;
  }

  public async createCategory(category: Category): Promise<void> {
    await api.post("/api/Categories", category);
  }

  public async updateCategory(category: Category): Promise<void> {
    await api.put(`/api/Categories/${category.id}`, category);
  }

  public async deleteCategory(id: number): Promise<void> {
    await api.delete(`/api/Categories/${id}`);
  }
}
