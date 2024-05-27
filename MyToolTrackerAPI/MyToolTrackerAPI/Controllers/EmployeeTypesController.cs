using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class EmployeeTypesController : Controller
	{
		private readonly IEmployeeTypeRepository _employeeTypeRepository;
		private readonly IMapper _mapper;

		public EmployeeTypesController(
			IEmployeeTypeRepository employeeTypeRepository,
			IMapper mapper)
		{
			_employeeTypeRepository = employeeTypeRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<EmployeeType>))]
		public IActionResult GetEmployeeTypes()
		{
			var employeeTypes = _mapper.Map<List<EmployeeTypeDto>>(
				_employeeTypeRepository.GetEmployeeTypes());

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(employeeTypes);
		}

		[HttpGet("{employeeTypeId}")]
		[ProducesResponseType(200, Type = typeof(EmployeeType))]
		[ProducesResponseType(400)]
		public IActionResult GetEmployeeType(int employeeTypeId)
		{
			if (!_employeeTypeRepository.EmployeeTypeExists(employeeTypeId))
				return NotFound();

			var employeeType = _mapper.Map<EmployeeTypeDto>(
				_employeeTypeRepository.GetEmployeeType(employeeTypeId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(employeeType);
		}

	}
}