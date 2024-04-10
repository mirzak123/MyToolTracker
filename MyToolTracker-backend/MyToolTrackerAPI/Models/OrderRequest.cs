using System;
namespace MyToolTrackerAPI.Models
{
	public class OrderRequest
	{
		public int Id { get; set; }
		public DateOnly StartDate { get; set; }
		public DateOnly EndDate { get; set; }
		public bool Status { get; set; }

		// Foreign keys
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public int ToolId { get; set; }

        // Relationships
        public Employee Employee { get; set; }
        public Project Project { get; set; }
        public Tool Tool { get; set; }
	}
}

