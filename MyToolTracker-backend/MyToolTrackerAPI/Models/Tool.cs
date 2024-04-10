using System;
namespace MyToolTrackerAPI.Models
{
	public class Tool
	{
        public int Id { get; set; }
		public string Name { get; set; }
		public string Barcode { get; set; }
		public decimal Price { get; set; }
		public string Model { get; set; }
		public string Manufacturer { get; set; }
		public DateTime EntryDate { get; set; }

        // Foreign keys
        public int CategoryId { get; set; }

        // Relationships
        public Category Category { get; set; }
		public ICollection<OrderRequest> OrderRequests { get; set; }
	}
}

