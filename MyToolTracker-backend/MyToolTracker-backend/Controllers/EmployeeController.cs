using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class EmployeeController : Controller
	{
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IMapper _mapper;

		public EmployeeController(IEmployeeRepository employeeRepository, IMapper mapper)
		{
			_employeeRepository = employeeRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Employee>))]
		public IActionResult GetEmployees()
		{
			var employees = _mapper.Map<List<EmployeeDto>>(_employeeRepository.GetEmployees());

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(employees);
		}

		[HttpGet("{employeeId}")]
		[ProducesResponseType(200, Type = typeof(Employee))]
		[ProducesResponseType(400)]
		public IActionResult GetEmplyee(int employeeId)
		{
			if (!_employeeRepository.EmployeeExists(employeeId))
				return NotFound();

			var employee = _mapper.Map<EmployeeDto>(_employeeRepository.GetEmployee(employeeId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(employee);
		}
	}
}

