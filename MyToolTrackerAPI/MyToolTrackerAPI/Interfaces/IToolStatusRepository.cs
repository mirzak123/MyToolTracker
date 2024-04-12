using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IToolStatusRepository
	{
        ICollection<ToolStatus> GetToolStatuses();
        ToolStatus GetToolStatus(int id);
        ToolStatus GetToolStatus(string name);
        bool ToolStatusExists(int id);
    }
}

