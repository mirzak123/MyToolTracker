using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IUserRoleRepository
	{
		ICollection<UserRole> GetUserRoles();
		UserRole GetUserRole(int id);
		UserRole GetUserRole(string name);
		bool UserRoleExists(int id);
	}
}

