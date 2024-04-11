using System;
namespace MyToolTrackerAPI.Dto
{
	public class CompanyDto
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPersonPhoneNumber { get; set; }
        public string Email { get; set; }
        public int CompanyTypeId { get; set; }
    }
}

