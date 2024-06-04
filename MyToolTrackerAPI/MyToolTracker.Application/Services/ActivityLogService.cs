using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Services
{
	public class ActivityLogService : IActivityLogService
	{
        private readonly IActivityLogRepository _activityLogRepository;

		public ActivityLogService(IActivityLogRepository activityLogRepository)
		{
            _activityLogRepository = activityLogRepository;
		}

        public async Task LogActivity(string userId, string actionType, int entityId, string entityType, string description)
        {
            var activity = new ActivityLog
            {
                UserId = userId,
                ActionType = actionType,
                EntityId = entityId,
                EntityType = entityType,
                Description = description
            };
            _activityLogRepository.CreateActivityLog(activity);
        }
    }
}

