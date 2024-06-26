﻿using MyToolTrackerAPI.Infrastructure.Data;
using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Infrastructure.Repositories
{
	public class EmployeeTypeRepository : IEmployeeTypeRepository
	{
        private readonly DataContext _context;

        public EmployeeTypeRepository(DataContext context)
        {
            _context = context;
        }

        public bool EmployeeTypeExists(int id)
        {
            return _context.EmployeeTypes.Any(et => et.Id == id);
        }

        public ICollection<EmployeeType> GetEmployeeTypes()
        {
            return _context.EmployeeTypes.OrderBy(et => et.Id).ToList();
        }

        public EmployeeType GetEmployeeType(int id)
        {
            return _context.EmployeeTypes.Where(et => et.Id == id)
                .FirstOrDefault();
        }

        public EmployeeType GetEmployeeType(string name)
        {
            return _context.EmployeeTypes.Where(et => et.Name == name)
                .FirstOrDefault();
        }
    }
}

