namespace MyToolTrackerAPI.Application.Dtos
{
	public class ActivityLogDto
	{
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserId { get; set; }
        public string ActionType { get; set; }
        public int EntityId { get; set; }
        public string EntityType { get; set; }
        public string Description { get; set; }
    }
}

