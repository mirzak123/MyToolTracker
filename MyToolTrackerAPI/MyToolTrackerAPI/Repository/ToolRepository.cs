using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
    public class ToolRepository : IToolRepository
	{
        private readonly DataContext _context;

        public ToolRepository(DataContext context)
		{
            _context = context;
		}

        public bool CreateTool(Tool tool)
        {
            _context.Add(tool);
            return Save();
        }

        public bool DeleteTool(Tool tool)
        {
            _context.Remove(tool);
            return Save();
        }

        public Tool GetTool(int id)
        {
            return _context.Tools.Where(t => t.Id == id).FirstOrDefault();
        }

        public Tool GetTool(string name)
        {
            return _context.Tools.Where(t => t.Name == name).FirstOrDefault();
        }

        public ICollection<Tool> GetTools()
        {
            return _context.Tools.OrderBy(t => t.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool ToolExists(int id)
        {
            return _context.Tools.Any(t => t.Id == id);
        }
    }
}

