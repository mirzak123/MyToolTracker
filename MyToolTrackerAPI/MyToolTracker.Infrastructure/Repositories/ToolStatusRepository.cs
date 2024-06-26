﻿using MyToolTrackerAPI.Infrastructure.Data;
using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Infrastructure.Repositories
{
    public class ToolStatusRepository : IToolStatusRepository
    {
        private readonly DataContext _context;

        public ToolStatusRepository(DataContext context)
        {
            _context = context;
        }

        public ToolStatus GetToolStatus(int id)
        {
            return _context.ToolStatuses.Where(ts => ts.Id == id)
                .FirstOrDefault();
        }

        public ToolStatus GetToolStatus(string name)
        {
            return _context.ToolStatuses.Where(ts => ts.Name == name)
                .FirstOrDefault();
        }

        public ICollection<ToolStatus> GetToolStatuses()
        {
            return _context.ToolStatuses.OrderBy(ts => ts.Id).ToList();
        }

        public bool ToolStatusExists(int id)
        {
            return _context.ToolStatuses.Any(ts => ts.Id == id);
        }
    }
}

