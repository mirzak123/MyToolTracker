using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Application.Dtos;
using MyToolTrackerAPI.Application.Interfaces;
using MyToolTrackerAPI.Application.Services;
using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
    [Authorize]
	public class CompaniesController : Controller
	{
		private readonly ICompanyRepository _companyRepository;
		private readonly IMapper _mapper;
        private readonly IActivityLogService _activityLogService;
        private readonly ITokenService _tokenService;

        public CompaniesController(ICompanyRepository companyRepository,
			IMapper mapper, ITokenService tokenService,
            IActivityLogService activityLogService)
		{
			_companyRepository = companyRepository;
			_mapper = mapper;
            _tokenService = tokenService;
            _activityLogService = activityLogService;
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

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Add",
                entityId: companyMap.Id,
                entityType: "Company",
                description: $"Company \"{companyMap.Name}\" was added.");

            return Ok("Successfully created");
        }

        [HttpPut("{companyId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult UpdateCompany(int companyId,
            [FromBody] CompanyDto updatedCompany)
        {
            if (updatedCompany == null)
                return BadRequest(ModelState);

            if (companyId != updatedCompany.Id)
                return BadRequest(ModelState);

            if (!_companyRepository.CompanyExists(companyId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var companyMap = _mapper.Map<Company>(updatedCompany);

            if (!_companyRepository.UpdateCompany(companyMap))
            {
                ModelState.AddModelError("", "Something went wrong updating company");
                return StatusCode(500, ModelState);
            }

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Update",
                entityId: companyMap.Id,
                entityType: "Company",
                description: $"Company \"{companyMap.Name}\" was updated.");

            return NoContent();
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

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Delete",
                entityId: companyToDelete.Id,
                entityType: "Company",
                description: $"Company \"{companyToDelete.Name}\" was deleted.");

            return NoContent();
        }
    }
}

