using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IOrderRequestRepository
	{
		ICollection<OrderRequest> GetOrderRequests();
		OrderRequest GetOrderRequest(int id);
		bool OrderRequestExists(int id);
		bool CreateOrderRequest(OrderRequest orderRequest);
		bool UpdateOrderRequest(OrderRequest orderRequest);
		bool DeleteOrderRequest(OrderRequest orderRequest);
		bool Save();
	}
}

