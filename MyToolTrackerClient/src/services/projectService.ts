import { Project } from '@/types/project';
import { BASE_URL } from '../../constants';

export interface IProjectService {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project>;
  createProject(project: Project): Promise<void>;
  updateProject(project: Project): Promise<void>;
  deleteProject(id: number): Promise<void>;
}

export class ProjectService implements IProjectService {
  public async getProjects(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/api/Projects`);
    return await response.json();
  }

  public async getProject(id: number): Promise<Project> {
    const response = await fetch(`${BASE_URL}/api/Projects/${id}`);
    return await response.json();
  }

  public async createProject(project: Project): Promise<void> {
    await fetch(`${BASE_URL}/api/Projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
  }

  public async updateProject(project: Project): Promise<void> {
    await fetch(`${BASE_URL}/api/Projects/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
  }

  public async deleteProject(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Projects/${id}`, {
      method: 'DELETE',
    });
  }
}
