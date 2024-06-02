using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface IEmployeeRepository
	{
		ICollection<Employee> GetEmployees();
		Employee GetEmployee(int id);
		Employee GetEmployee(string firstName, string lastName);
		Employee GetEmployee(string jmbg);
		bool EmployeeExists(int id);
		bool CreateEmployee(Employee employee);
		bool UpdateEmployee(Employee employee);
		bool DeleteEmployee(Employee employee);
		bool Save();
	}
}