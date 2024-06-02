using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IEmployeeTypeRepository
	{
        ICollection<EmployeeType> GetEmployeeTypes();
        EmployeeType GetEmployeeType(int id);
        EmployeeType GetEmployeeType(string name);
        bool EmployeeTypeExists(int id);
    }
}

