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
	public class EmployeesController : Controller
	{
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IMapper _mapper;

		public EmployeesController(IEmployeeRepository employeeRepository,
			IMapper mapper)
		{
			_employeeRepository = employeeRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Employee>))]
		public IActionResult GetEmployees()
		{
			var employees = _mapper.Map<List<EmployeeDto>>(_employeeRepository
				.GetEmployees());

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(employees);
		}

		[HttpGet("{employeeId}")]
		[ProducesResponseType(200, Type = typeof(Employee))]
		[ProducesResponseType(400)]
		public IActionResult GetEmployee(int employeeId)
		{
			if (!_employeeRepository.EmployeeExists(employeeId))
				return NotFound();

			var employee = _mapper.Map<EmployeeDto>(_employeeRepository
				.GetEmployee(employeeId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(employee);
		}

		[HttpPost]
		[ProducesResponseType(204)]
		[ProducesResponseType(400)]
		public IActionResult CreateEmployee([FromBody] EmployeeDto employeeCreate)
		{
			if (employeeCreate == null)
				return BadRequest(ModelState);

			var employee = _employeeRepository.GetEmployees()
				.Where(e => e.IdCardNumber.Trim().ToUpper() ==
				employeeCreate.IdCardNumber.Trim().ToUpper()).FirstOrDefault();

			if (employee != null)
			{
				ModelState.AddModelError("", "Employee already exists");
				return StatusCode(422, ModelState);
			}

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var employeeMap = _mapper.Map<Employee>(employeeCreate);

			if (!_employeeRepository.CreateEmployee(employeeMap))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(500, ModelState);
			}

			return Ok("Successfully created");
		}
	}
}

