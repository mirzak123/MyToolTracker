using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Models;
using MyToolTrackerAPI.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MyToolTrackerAPI.Repository
{
	public class EmployeeRepository : IEmployeeRepository
	{
		private readonly DataContext _context;

		public EmployeeRepository(DataContext context)
		{
			_context = context;
		}

        public bool CreateEmployee(Employee employee)
        {
            _context.Add(employee);
            return Save();
        }

        public bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }

        public Employee GetEmployee(int id)
        {
            return _context.Employees.Where(e => e.Id == id).FirstOrDefault();
        }

        public Employee GetEmployee(string firstName, string lastName)
        {
            return _context.Employees.Where(e =>
                e.FirstName == firstName && e.LastName == lastName).
                FirstOrDefault();
        }

        public Employee GetEmployee(string jmbg)
        {
            return _context.Employees.Where(e => e.Jmbg == jmbg).FirstOrDefault();
        }

        public ICollection<Employee> GetEmployees()
		{
            return _context.Employees.OrderBy(e => e.Id).ToList();
		}

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}

