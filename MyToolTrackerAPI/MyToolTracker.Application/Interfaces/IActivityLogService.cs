namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IActivityLogService
	{
		Task LogActivity(string userId, string actionType, int entityId, string entityType, string description);
	}
}