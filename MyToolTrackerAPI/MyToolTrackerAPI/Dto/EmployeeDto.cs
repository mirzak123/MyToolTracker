using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Dto
{
	public class EmployeeDto
	{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Jmbg { get; set; }
        public string IdCardNumber { get; set; }
        public string ContactNumber { get; set; }
        public string Type { get; set; }
    }
}

