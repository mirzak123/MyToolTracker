import { Tool } from "@/types/tool";
import { ToolStatus } from "@/types/toolStatus";
import api from "@/config/axios";

export interface IToolService {
  getTools(): Promise<Tool[]>;
  getTool(id: number): Promise<Tool>;
  createTool(tool: Tool): Promise<void>;
  updateTool(tool: Tool): Promise<void>;
  deleteTool(id: number): Promise<void>;
  getToolStatuses(): Promise<ToolStatus[]>;
}

export class ToolService implements IToolService {
  async getTools(): Promise<Tool[]> {
    const response = await api.get("/api/Tools");
    return await response.data;
  }

  async getTool(id: number): Promise<Tool> {
    const response = await api.get(`/api/Tools/${id}`);
    return await response.data;
  }

  async createTool(tool: Tool): Promise<void> {
    await api.post("/api/Tools", tool);
  }

  async updateTool(tool: Tool): Promise<void> {
    await api.put(`/api/Tools/${tool.id}`, tool);
  }

  async deleteTool(id: number): Promise<void> {
    await api.delete(`/api/Tools/${id}`);
  }

  async getToolStatuses(): Promise<ToolStatus[]> {
    const response = await api.get("/api/ToolStatuses");
    return await response.data;
  }
}
