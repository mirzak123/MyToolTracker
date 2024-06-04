using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Application.Dtos;
using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.API.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class EmployeesController : Controller
	{
		private readonly IActivityLogService _activityLogService;
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IMapper _mapper;
		private readonly ITokenService _tokenService;

		public EmployeesController(IEmployeeRepository employeeRepository,
			IMapper mapper, IActivityLogService activityLogService,
			ITokenService tokenService)
		{
			_activityLogService = activityLogService;
			_employeeRepository = employeeRepository;
			_mapper = mapper;
			_tokenService = tokenService;
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

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Add",
                entityId: employeeMap.Id,
                entityType: "Employee",
                description: $"Employee \"{employeeMap.FirstName} {employeeMap.LastName}\" was added.");

            return Ok("Successfully created");
		}

		[HttpPut("{employeeId}")]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(204)]
		public IActionResult UpdateEmployee(int employeeId,
			[FromBody] EmployeeDto updatedEmployee)
		{
			if (updatedEmployee == null)
				return BadRequest(ModelState);

			if (employeeId != updatedEmployee.Id)
				return BadRequest(ModelState);

			if (!_employeeRepository.EmployeeExists(employeeId))
				return NotFound();

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var employeeMap = _mapper.Map<Employee>(updatedEmployee);

			if (!_employeeRepository.UpdateEmployee(employeeMap))
			{
				ModelState.AddModelError("", "Something went wrong updating employee");
				return StatusCode(500, ModelState);
			}

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Update",
                entityId: employeeMap.Id,
                entityType: "Employee",
                description: $"Employee \"{employeeMap.FirstName} {employeeMap.LastName}\" was updated.");

            return NoContent();
		}

		[HttpDelete("{employeeId}")]
		[ProducesResponseType(400)]
		[ProducesResponseType(204)]
		[ProducesResponseType(404)]
		public IActionResult DeleteEmployee(int employeeId)
		{
			if (!_employeeRepository.EmployeeExists(employeeId))
				return NotFound();

			var employeeToDelete = _employeeRepository.GetEmployee(employeeId);

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (!_employeeRepository.DeleteEmployee(employeeToDelete))
				ModelState.AddModelError("", "Something went wrong deleting employee");

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Delete",
                entityId: employeeId,
                entityType: "Employee",
                description: $"Employee \"{employeeToDelete.FirstName} {employeeToDelete.LastName}\" was deleted.");

            return NoContent();
		}
	}
}

