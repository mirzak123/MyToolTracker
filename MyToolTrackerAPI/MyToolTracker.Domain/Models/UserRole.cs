namespace MyToolTrackerAPI.Domain.Models
{
	public class UserRole
	{
		public int Id { get; set; }
        public string Name { get; set; }

        // Relationships
        public ICollection<User> Users { get; set; }
	}
}