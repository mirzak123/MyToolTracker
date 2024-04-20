import { Tool } from '@/types/tool';
import { ToolStatus } from '@/types/toolStatus';
import { BASE_URL } from '../../constants';

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
    const response = await fetch(`${BASE_URL}/api/Tools`);
    return await response.json();
  }

  async getTool(id: number): Promise<Tool> {
    const response = await fetch(`${BASE_URL}/api/Tools/${id}`);
    return await response.json();
  }

  async createTool(tool: Tool): Promise<void> {
    await fetch(`${BASE_URL}/api/Tools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tool),
    });
  }

  async updateTool(tool: Tool): Promise<void> {
    await fetch(`${BASE_URL}/api/Tools/${tool.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tool),
    });
  }

  async deleteTool(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Tools/${id}`, {
      method: 'DELETE',
    });
  }

  async getToolStatuses(): Promise<ToolStatus[]> {
    const response = await fetch(`${BASE_URL}/api/ToolStatuses`);
    return await response.json();
  }
}
