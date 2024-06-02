using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IProjectRepository
	{
		ICollection<Project> GetProjects();
		Project GetProject(int id);
		bool ProjectExists(int id);
		bool CreateProject(Project project);
		bool UpdateProject(Project project);
		bool DeleteProject(Project project);
		bool Save();
	}
}

