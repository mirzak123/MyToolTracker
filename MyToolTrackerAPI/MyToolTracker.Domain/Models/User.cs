namespace MyToolTrackerAPI.Domain.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }

		// Foreign keys
		public int UserRoleId { get; set; }

		// Relationships
		public UserRole UserRole { get; set; }
	}
}

