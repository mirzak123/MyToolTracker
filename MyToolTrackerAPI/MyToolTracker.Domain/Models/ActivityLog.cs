namespace MyToolTrackerAPI.Domain.Models
{
	public class ActivityLog
	{
		public int Id { get; set; }
		public DateTime Timestamp { get; set; }
		public string UserId { get; set; }
		public string ActionType { get; set; }
		public int EntityId { get; set; }
		public string EntityType { get; set; }
		public string Description { get; set; }

        public ActivityLog()
        {
            Timestamp = DateTime.UtcNow;
        }
    }
}