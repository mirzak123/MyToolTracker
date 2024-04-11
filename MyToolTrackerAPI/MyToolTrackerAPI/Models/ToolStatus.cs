using System;
namespace MyToolTrackerAPI.Models
{
	public class ToolStatus
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Relationships
		public ICollection<Tool> Tools { get; set; }
	}
}

