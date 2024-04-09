using System;
namespace MyToolTrackerAPI.Dto
{
	public class ToolDto
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
    }
}

