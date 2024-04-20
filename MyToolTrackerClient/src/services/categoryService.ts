import { Category } from '@/types/category';
import { BASE_URL } from '../../constants';

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category>;
  createCategory(category: Category): Promise<void>;
  updateCategory(category: Category): Promise<void>;
  deleteCategory(id: number): Promise<void>;
}

export class CategoryService implements ICategoryService {
  public async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/api/Categories`);
    return await response.json();
  }

  public async getCategory(id: number): Promise<Category> {
    const response = await fetch(`${BASE_URL}/api/Categories/${id}`);
    return await response.json();
  }

  public async createCategory(category: Category): Promise<void> {
    await fetch(`${BASE_URL}/api/Categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
  }

  public async updateCategory(category: Category): Promise<void> {
    await fetch(`${BASE_URL}/api/Categories/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
  }

  public async deleteCategory(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Categories/${id}`, {
      method: 'DELETE',
    });
  }
}
