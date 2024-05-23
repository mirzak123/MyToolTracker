using System;
using Microsoft.JSInterop.Infrastructure;
namespace MyToolTrackerAPI.Models
{
	public class Project
	{
		public int Id { get; set; }

        public string Name { get; set; }
        public string ContractNumber { get; set; }
		public int Year { get; set; }

		

		// Foreign keys
		public int CompanyId { get; set; }

        // Relationships
        public Company Company { get; set; }
        public ICollection<OrderRequest> OrderRequests { get; set; }


	}
}

