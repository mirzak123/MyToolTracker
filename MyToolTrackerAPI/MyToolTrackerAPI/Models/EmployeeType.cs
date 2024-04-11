using System;
namespace MyToolTrackerAPI.Models
{
	public class EmployeeType
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Relationships
		public ICollection<Employee> Employees { get; set; }
	}
}

