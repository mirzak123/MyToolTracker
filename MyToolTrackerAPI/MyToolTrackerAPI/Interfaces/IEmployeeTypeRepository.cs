using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface IEmployeeTypeRepository
	{
        ICollection<EmployeeType> GetEmployeeTypes();
        EmployeeType GetEmployeeType(int id);
        EmployeeType GetEmployeeType(string name);
        bool EmployeeTypeExists(int id);
    }
}

