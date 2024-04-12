﻿using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
    public class OrderRequestRepository : IOrderRequestRepository
	{
        private readonly DataContext _context;

		public OrderRequestRepository(DataContext context)
		{
            _context = context;
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
    }
}

