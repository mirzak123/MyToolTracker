using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
    public class ProjectRepository : IProjectRepository
	{
        private readonly DataContext _context;

		public ProjectRepository(DataContext context)
		{
            _context = context;
		}

        public Project GetProject(int id)
        {
            return _context.Projects.Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Project> GetProjects()
        {
            return _context.Projects.OrderBy(p => p.Id).ToList();
        }

        public bool ProjectExists(int id)
        {
            return _context.Projects.Any(p => p.Id == id);
        }
    }
}

