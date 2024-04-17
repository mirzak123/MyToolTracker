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

// Dummy data
const tools: Tool[] = [
  {
    id: 1,
    barcode: '123456789012',
    name: 'Tool 1',
    price: 100,
    entryDate: new Date(),
    model: 'Model 1',
    manufacturer: 'Manufacturer 1',
    categoryId: 1,
    orderRequestId: 1,
    toolStatusId: 1,
  },
  {
    id: 2,
    barcode: '123456789019',
    name: 'Tool 2',
    price: 200,
    entryDate: new Date(),
    model: 'Model 2',
    manufacturer: 'Manufacturer 2',
    categoryId: 2,
    orderRequestId: 2,
    toolStatusId: 2,
  },
];

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
    // await fetch(`/api/tools/${tool.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(tool),
    // });

    return new Promise((resolve) => {
      const index = tools.findIndex((t) => t.id === tool.id);
      tools[index] = tool;
      resolve();
    });
  }

  async deleteTool(id: number): Promise<void> {
    // await fetch(`/api/tools/${id}`, {
    //   method: 'DELETE',
    // });

    return new Promise((resolve) => {
      const index = tools.findIndex((t) => t.id === id);
      tools.splice(index, 1);
      resolve();
    });
  }

  async getToolStatuses(): Promise<ToolStatus[]> {
    const response = await fetch(`${BASE_URL}/api/ToolStatuses`);
    return await response.json();
  }
}
