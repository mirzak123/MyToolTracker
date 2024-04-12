﻿using System;
namespace MyToolTrackerAPI.Dto
{
	public class UserDto
	{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        // Foreign keys
        public int UserRoleId { get; set; }
    }
}
