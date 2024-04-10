using System;
namespace MyToolTrackerAPI.Models
{
	public class Employee
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Jmbg { get; set; }
		public string IdCardNumber { get; set; }
		public string ContactNumber { get; set; }
		public string Type { get; set; }

        public ICollection<OrderRequest> OrderRequests { get; set; }
	}
}

