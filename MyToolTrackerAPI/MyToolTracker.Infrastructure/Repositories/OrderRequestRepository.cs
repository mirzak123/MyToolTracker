using MyToolTrackerAPI.Infrastructure.Data;
using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Infrastructure.Repositories
{
    public class OrderRequestRepository : IOrderRequestRepository
	{
        private readonly DataContext _context;

		public OrderRequestRepository(DataContext context)
		{
            _context = context;
		}

        public bool CreateOrderRequest(OrderRequest orderRequest)
        {
            _context.Add(orderRequest);
            return Save();
        }

        public bool DeleteOrderRequest(OrderRequest orderRequest)
        {
            _context.Remove(orderRequest);
            return Save();
        }

        public OrderRequest GetOrderRequest(int id)
        {
            return _context.OrderRequests.Where(or => or.Id == id)
                .FirstOrDefault();
        }

        public ICollection<OrderRequest> GetOrderRequests()
        {
            return _context.OrderRequests.OrderBy(or => or.Id).ToList();
        }

        public bool OrderRequestExists(int id)
        {
            return _context.OrderRequests.Any(or => or.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateOrderRequest(OrderRequest orderRequest)
        {
            _context.Update(orderRequest);
            return Save();
        }
    }
}

