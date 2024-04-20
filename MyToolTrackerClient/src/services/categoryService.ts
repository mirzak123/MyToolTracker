import { Category } from '@/types/category';
import { BASE_URL } from '../../constants';

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category>;
  createCategory(category: Category): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
}

// Dummy data
const categories: Category[] = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
  { id: 4, name: 'Category 4' },
  { id: 5, name: 'Category 5' },
  { id: 6, name: 'Category 6' },
];

export class CategoryService implements ICategoryService {
  public async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/api/Categories`);
    return await response.json();
  }

  public async getCategory(id: number): Promise<Category> {
    const response = await fetch(`${BASE_URL}/api/Categories/${id}`);
    return await response.json();
  }

  public async createCategory(category: Category): Promise<Category> {
    // const response = await fetch('/api/categories', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(category),
    // });
    // return await response.json();

    return new Promise((resolve) => {
      categories.push(category);
      resolve(category);
    });
  }

  public async updateCategory(category: Category): Promise<Category> {
    // const response = await fetch(`/api/categories/${category.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(category),
    // });
    // return await response.json();

    return new Promise((resolve) => {
      const index = categories.findIndex((c) => c.id === category.id);
      categories[index] = category;
      resolve(category);
    });
  }

  public async deleteCategory(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Categories/${id}`, {
      method: 'DELETE',
    });
  }
}
