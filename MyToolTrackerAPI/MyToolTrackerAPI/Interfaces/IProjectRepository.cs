using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IProjectRepository
	{
		ICollection<Project> GetProjects();
		Project GetProject(int id);
		bool ProjectExists(int id);
		bool CreateProject(Project project);
		bool DeleteProject(Project project);
		bool Save();
	}
}

