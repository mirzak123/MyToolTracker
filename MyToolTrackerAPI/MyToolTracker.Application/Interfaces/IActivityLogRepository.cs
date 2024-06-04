using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
    public interface IActivityLogRepository
    {
        ICollection<ActivityLog> GetActivityLogs();
        ICollection<ActivityLog> GetRecentActivityLogs(int count);
        ActivityLog GetActivityLog(int id);
        bool CreateActivityLog(ActivityLog activityLog);
        bool DeleteActivityLog(ActivityLog activityLog);
        bool Save();
    }
}
