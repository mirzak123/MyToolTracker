using System;
namespace MyToolTrackerAPI.Models
{
	public class CompanyType
	{
		public int Id { get; set; }
		public string Name { get; set; }

        // Relationships
        public ICollection<Company> Companies { get; set; }
    }
}

