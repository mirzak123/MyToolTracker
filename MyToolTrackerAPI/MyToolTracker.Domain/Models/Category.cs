namespace MyToolTrackerAPI.Domain.Models
{
	public class Category
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Relationships
		public ICollection<Tool> Tools { get; set; }
	}
}

