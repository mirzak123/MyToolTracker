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
    public class CompanyTypesController : Controller
    {
        private readonly ICompanyTypeRepository _companyTypeRepository;
        private readonly IMapper _mapper;

        public CompanyTypesController(
            ICompanyTypeRepository companyTypeRepository,
            IMapper mapper)
        {
            _companyTypeRepository = companyTypeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CompanyType>))]
        public IActionResult GetCompanyTypes()
        {
            var companyTypes = _mapper.Map<List<CompanyTypeDto>>(
                _companyTypeRepository.GetCompanyTypes());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(companyTypes);
        }

        [HttpGet("{companyTypeId}")]
        [ProducesResponseType(200, Type = typeof(CompanyType))]
        [ProducesResponseType(400)]
        public IActionResult GetCompanyType(int companyTypeId)
        {
            if (!_companyTypeRepository.CompanyTypeExists(companyTypeId))
                return NotFound();

            var companyType = _mapper.Map<CompanyTypeDto>(
                _companyTypeRepository.GetCompanyType(companyTypeId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(companyType);
        }

    }
}