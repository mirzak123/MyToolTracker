using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IUserRoleRepository
	{
		ICollection<UserRole> GetUserRoles();
		UserRole GetUserRole(int id);
		UserRole GetUserRole(string name);
		bool UserRoleExists(int id);
	}
}

