using System;
namespace MyToolTrackerAPI.Dto
{
	public class ProjectDto
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContractNumber { get; set; }
        public int Year { get; set; }

        // Foreign keys
        public int CompanyId { get; set; }
    }
}

