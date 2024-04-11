using System;
using System.ComponentModel.DataAnnotations;
namespace MyToolTrackerAPI.Models
{
	public class Category
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Relationships
		public ICollection<Tool> Tools { get; set; }
	}
}

