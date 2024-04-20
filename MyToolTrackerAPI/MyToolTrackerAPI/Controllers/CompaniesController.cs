using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;
using MyToolTrackerAPI.Repository;

namespace MyToolTrackerAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompaniesController : Controller
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly IMapper _mapper;

		public CompaniesController(ICompanyRepository companyRepository,
			IMapper mapper)
		{
			_companyRepository = companyRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Company>))]
		public IActionResult GetCompanies()
		{
			var companies = _mapper.Map<List<CompanyDto>>(_companyRepository
				.GetCompanies());

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

			var company = _mapper.Map<CompanyDto>(_companyRepository
				.GetCompany(companyId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(company);
		}

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCompany(
            [FromBody] CompanyDto companyCreate)
        {
            if (companyCreate == null)
                return BadRequest(ModelState);

            var company = _companyRepository.GetCompanies()
                .Where(c => c.Name.Trim().ToUpper() ==
				companyCreate.Name.TrimEnd().ToUpper()).FirstOrDefault();

            if (company != null)
            {
                ModelState.AddModelError("", "Company already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var companyMap = _mapper.Map<Company>(companyCreate);

            if (!_companyRepository.CreateCompany(companyMap))
            {
                ModelState.AddModelError("",
                    "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpDelete("{companyId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult DeleteCompany(int companyId)
        {
            if (!_companyRepository.CompanyExists(companyId))
                return NotFound();

            var companyToDelete = _companyRepository.GetCompany(companyId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_companyRepository.DeleteCompany(companyToDelete))
                ModelState.AddModelError("", "Something went wrong deleting company");

            return NoContent();
        }
    }
}

