using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IToolStatusRepository
	{
        ICollection<ToolStatus> GetToolStatuses();
        ToolStatus GetToolStatus(int id);
        ToolStatus GetToolStatus(string name);
        bool ToolStatusExists(int id);
    }
}

