using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IToolRepository
	{
        ICollection<Tool> GetTools();
        Tool GetTool(int id);
        Tool GetTool(string name);
        bool ToolExists(int id);
        bool CreateTool(Tool tool);
        bool UpdateTool(Tool tool);
        bool DeleteTool(Tool tool);
        bool Save();
    }
}

