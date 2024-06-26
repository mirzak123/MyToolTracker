﻿using AutoMapper;
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