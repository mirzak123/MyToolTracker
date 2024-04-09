import { Tool } from '@/types/tool';
import { ToolStatus } from '@/types/toolStatus';

export interface IToolService {
  getTools(): Promise<Tool[]>;
  getTool(id: number): Promise<Tool>;
  createTool(tool: Tool): Promise<void>;
  updateTool(tool: Tool): Promise<void>;
  deleteTool(id: number): Promise<void>;
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
    status: ToolStatus.AVAILABLE,
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
    status: ToolStatus.RESERVED,
  },
];

export class ToolService implements IToolService {
  async getTools(): Promise<Tool[]> {
    // const response = await fetch('/api/tools');
    // return await response.json();

    return new Promise((resolve) => {
      resolve(tools);
    });
  }

  async getTool(id: number): Promise<Tool> {
    // const response = await fetch(`/api/tools/${id}`);
    // return await response.json();

    return new Promise((resolve) => {
      const tool = tools.find((t) => t.id === id);
      resolve(tool as Tool);
    });
  }

  async createTool(tool: Tool): Promise<void> {
    // await fetch('/api/tools', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(tool),
    // });

    return new Promise((resolve) => {
      tools.push(tool);
      resolve();
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
}
