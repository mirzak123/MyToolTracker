﻿namespace MyToolTrackerAPI.Application.Dtos
{
	public class EmployeeDto
	{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Jmbg { get; set; }
        public string IdCardNumber { get; set; }
        public string ContactNumber { get; set; }
        public int EmployeeTypeId { get; set; }
    }
}

