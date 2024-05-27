import { Project } from "@/types/project";
import api from "@/config/axios";

export interface IProjectService {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project>;
  createProject(project: Project): Promise<void>;
  updateProject(project: Project): Promise<void>;
  deleteProject(id: number): Promise<void>;
}

export class ProjectService implements IProjectService {
  public async getProjects(): Promise<Project[]> {
    const response = await api.get("/api/Projects");
    return response.data;
  }

  public async getProject(id: number): Promise<Project> {
    const response = await api.get(`/api/Projects/${id}`);
    return response.data;
  }

  public async createProject(project: Project): Promise<void> {
    await api.post("/api/Projects", project);
  }

  public async updateProject(project: Project): Promise<void> {
    await api.put(`/api/Projects/${project.id}`, project);
  }

  public async deleteProject(id: number): Promise<void> {
    await api.delete(`/api/Projects/${id}`);
  }
}
