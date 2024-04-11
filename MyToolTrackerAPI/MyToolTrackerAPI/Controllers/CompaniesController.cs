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
	public class CompaniesController : Controller
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly IMapper _mapper;

		public CompaniesController(ICompanyRepository companyRepository, IMapper mapper)
		{
			_companyRepository = companyRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Company>))]
		public IActionResult GetCompanies()
		{
			var companies = _mapper.Map<List<CompanyDto>>(_companyRepository.GetCompanies());

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(companies);
		}

		[HttpGet("{companyId}")]
		[ProducesResponseType(200, Type = typeof(Company))]
		[ProducesResponseType(400)]
		public IActionResult GetCompany(int companyId)
		{
			if (!_companyRepository.CompanyExists(companyId))
				return NotFound();

			var company = _mapper.Map<CompanyDto>(_companyRepository.GetCompany(companyId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(company);
		}
	}
}

