import { OrderRequest } from "@/types/orderRequest";
import api from "@/config/axios";

export interface IOrderRequestService {
  getOrderRequests(): Promise<OrderRequest[]>;
  getOrderRequest(id: number): Promise<OrderRequest>;
  createOrderRequest(orderRequest: OrderRequest): Promise<void>;
  updateOrderRequest(orderRequest: OrderRequest): Promise<void>;
  deleteOrderRequest(id: number): Promise<void>;
}

export class OrderRequestService implements IOrderRequestService {
  async getOrderRequests(): Promise<OrderRequest[]> {
    const response = await api.get("/api/OrderRequests");
    return response.data;
  }

  async getOrderRequest(id: number): Promise<OrderRequest> {
    const response = await api.get(`/api/OrderRequests/${id}`);
    return response.data;
  }

  async createOrderRequest(orderRequest: OrderRequest): Promise<void> {
    await api.post("/api/OrderRequests", orderRequest);
  }

  async updateOrderRequest(orderRequest: OrderRequest): Promise<void> {
    await api.put(`/api/OrderRequests/${orderRequest.id}`, orderRequest);
  }

  async deleteOrderRequest(id: number): Promise<void> {
    await api.delete(`/api/OrderRequests/${id}`);
  }
}
