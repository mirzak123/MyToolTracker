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
	public class ProjectsController : Controller
	{
		private readonly IProjectRepository _projectRepository;
		private readonly IMapper _mapper;

		public ProjectsController(IProjectRepository projectRepository, IMapper mapper)
		{
			_projectRepository = projectRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Project>))]
		public IActionResult GetProjects()
		{
			var projects = _mapper.Map<List<ProjectDto>>(_projectRepository.GetProjects());

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(projects);
		}

		[HttpGet("{projectId}")]
		[ProducesResponseType(200, Type = typeof(Project))]
		[ProducesResponseType(400)]
		public IActionResult GetProject(int projectId)
		{
			if (!_projectRepository.ProjectExists(projectId))
				return NotFound();

			var project = _mapper.Map<ProjectDto>(_projectRepository.GetProject(projectId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(project);
		}
	}
}

