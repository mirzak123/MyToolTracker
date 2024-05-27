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
    public class UserRolesController : Controller
    {
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IMapper _mapper;

        public UserRolesController(
            IUserRoleRepository userRoleRepository,
            IMapper mapper)
        {
            _userRoleRepository = userRoleRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserRole>))]
        public IActionResult GetUserRoles()
        {
            var userRoles = _mapper.Map<List<UserRoleDto>>(
                _userRoleRepository.GetUserRoles());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userRoles);
        }

        [HttpGet("{userRoleId}")]
        [ProducesResponseType(200, Type = typeof(UserRole))]
        [ProducesResponseType(400)]
        public IActionResult GetUserRole(int userRoleId)
        {
            if (!_userRoleRepository.UserRoleExists(userRoleId))
                return NotFound();

            var userRole = _mapper.Map<UserRoleDto>(
                _userRoleRepository.GetUserRole(userRoleId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userRole);
        }

    }
}