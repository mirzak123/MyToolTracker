import { OrderRequest } from '@/types/orderRequest';

export interface IOrderRequestService {
  getOrderRequests(): Promise<OrderRequest[]>;
  getOrderRequest(id: number): Promise<OrderRequest>;
  createOrderRequest(orderRequest: OrderRequest): Promise<void>;
  updateOrderRequest(orderRequest: OrderRequest): Promise<void>;
  deleteOrderRequest(id: string): Promise<void>;
}

// Dummy data
const orderRequests: OrderRequest[] = [
  {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    status: true,
    employeeId: 1,
    projectId: 1,
    toolId: 1,
  },
  {
    id: 2,
    startDate: new Date(),
    endDate: new Date(),
    status: true,
    employeeId: 2,
    projectId: 2,
    toolId: 2,
  },
];

export class OrderRequestService implements IOrderRequestService {
  async getOrderRequests(): Promise<OrderRequest[]> {
    // const response = await fetch('/api/orderRequests');
    // return response.json();

    return new Promise((resolve) => {
      resolve(orderRequests);
    });
  }

  async getOrderRequest(id: number): Promise<OrderRequest> {
    // const response = await fetch(`/api/orderRequests/${id}`);
    // return response.json();

    return new Promise((resolve) => {
      const orderRequest = orderRequests.find((item) => item.id === id);
      resolve(orderRequest as OrderRequest);
    });
  }

  async createOrderRequest(orderRequest: OrderRequest): Promise<void> {
    // await fetch('/api/orderRequests', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(orderRequest),
    // });

    return new Promise((resolve) => {
      orderRequests.push(orderRequest);
      resolve();
    });
  }

  async updateOrderRequest(orderRequest: OrderRequest): Promise<void> {
    // await fetch(`/api/orderRequests/${orderRequest.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(orderRequest),
    // });

    return new Promise((resolve) => {
      const index = orderRequests.findIndex((item) => item.id === orderRequest.id);
      orderRequests[index] = orderRequest;
      resolve();
    });
  }

  async deleteOrderRequest(id: string): Promise<void> {
    // await fetch(`/api/orderRequests/${id}`, {
    //   method: 'DELETE',
    // });

    return new Promise((resolve) => {
      const index = orderRequests.findIndex((item) => item.id === Number(id));
      orderRequests.splice(index, 1);
      resolve();
    });
  }
}
