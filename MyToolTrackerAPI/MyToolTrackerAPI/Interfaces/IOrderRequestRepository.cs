using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IOrderRequestRepository
	{
		ICollection<OrderRequest> GetOrderRequests();
		OrderRequest GetOrderRequest(int id);
		bool OrderRequestExists(int id);
		bool CreateOrderRequest(OrderRequest orderRequest);
		bool Save();
	}
}

