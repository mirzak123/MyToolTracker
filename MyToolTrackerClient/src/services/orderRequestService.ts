import { OrderRequest } from '@/types/orderRequest';
import { BASE_URL } from '../../constants';

export interface IOrderRequestService {
  getOrderRequests(): Promise<OrderRequest[]>;
  getOrderRequest(id: number): Promise<OrderRequest>;
  createOrderRequest(orderRequest: OrderRequest): Promise<void>;
  updateOrderRequest(orderRequest: OrderRequest): Promise<void>;
  deleteOrderRequest(id: string): Promise<void>;
}

export class OrderRequestService implements IOrderRequestService {
  async getOrderRequests(): Promise<OrderRequest[]> {
    const response = await fetch(`${BASE_URL}/api/OrderRequests`);
    return response.json();
  }

  async getOrderRequest(id: number): Promise<OrderRequest> {
    const response = await fetch(`${BASE_URL}/api/OrderRequests/${id}`);
    return response.json();
  }

  async createOrderRequest(orderRequest: OrderRequest): Promise<void> {
    await fetch(`${BASE_URL}/api/OrderRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderRequest),
    });
  }

  async updateOrderRequest(orderRequest: OrderRequest): Promise<void> {
    await fetch(`${BASE_URL}/api/OrderRequests/${orderRequest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderRequest),
    });
  }

  async deleteOrderRequest(id: string): Promise<void> {
    await fetch(`${BASE_URL}/api/OrderRequests/${id}`, {
      method: 'DELETE',
    });
  }
}
