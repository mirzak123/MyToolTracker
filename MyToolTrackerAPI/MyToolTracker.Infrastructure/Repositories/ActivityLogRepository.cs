using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;
using MyToolTrackerAPI.Infrastructure.Data;

namespace MyToolTrackerAPI.Infrastructure.Repositories
{
    public class ActivityLogRepository : IActivityLogRepository
	{
        private readonly DataContext _context;

		public ActivityLogRepository(DataContext context)
		{
            _context = context;
		}

        public bool CreateActivityLog(ActivityLog activityLog)
        {
            _context.Add(activityLog);
            return Save();
        }

        public bool DeleteActivityLog(ActivityLog activityLog)
        {
            _context.Remove(activityLog);
            return Save();
        }

        public ActivityLog GetActivityLog(int id)
        {
            return _context.ActivityLogs.Where(a => a.Id == id).FirstOrDefault();
        }

        public ICollection<ActivityLog> GetActivityLogs()
        {
            return _context.ActivityLogs.OrderBy(a => a.Id).ToList();
        }

        public ICollection<ActivityLog> GetRecentActivityLogs(int count)
        {
            return _context.ActivityLogs.OrderByDescending(a => a.Timestamp).Take(count).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}

