using System;
namespace MyToolTrackerAPI.Models
{
    public class Company
	{
        public int Id { get; set; }
		public string Name { get; set; }
		public string PhoneNumber { get; set; }
		public string Address { get; set; }
		public string ContactPerson { get; set; }
		public string ContactPersonPhoneNumber { get; set; }
		public string Email { get; set; }
		public string Type { get; set; }

		// Relationships
		public ICollection<Project> Projects { get; set; }
	}
}

