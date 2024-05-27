using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;
using MyToolTrackerAPI.Repository;

namespace MyToolTrackerAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
    [Authorize]
	public class ProjectsController : Controller
	{
		private readonly IProjectRepository _projectRepository;
		private readonly IMapper _mapper;

		public ProjectsController(IProjectRepository projectRepository,
			IMapper mapper)
		{
			_projectRepository = projectRepository;
			_mapper = mapper;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Project>))]
		public IActionResult GetProjects()
		{
			var projects = _mapper.Map<List<ProjectDto>>(_projectRepository
				.GetProjects());

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

			var project = _mapper.Map<ProjectDto>(_projectRepository
				.GetProject(projectId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(project);
		}

		[HttpPost]
		[ProducesResponseType(204)]
		[ProducesResponseType(400)]
        public IActionResult CreateProject([FromBody] ProjectDto projectCreate)
        {
            if (projectCreate == null)
                return BadRequest(ModelState);

            var project = _projectRepository.GetProjects()
                .Where(e => e.ContractNumber.Trim().ToUpper() ==
                projectCreate.ContractNumber.Trim().ToUpper()).FirstOrDefault();

            if (project != null)
            {
                ModelState.AddModelError("", "Project already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var projectMap = _mapper.Map<Project>(projectCreate);

            if (!_projectRepository.CreateProject(projectMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{projectId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult UpdateProject(int projectId,
            [FromBody] ProjectDto updatedProject)
        {
            if (updatedProject == null)
                return BadRequest(ModelState);

            if (projectId != updatedProject.Id)
                return BadRequest(ModelState);

            if (!_projectRepository.ProjectExists(projectId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var projectMap = _mapper.Map<Project>(updatedProject);

            if (!_projectRepository.UpdateProject(projectMap))
            {
                ModelState.AddModelError("", "Something went wrong updating project");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{projectId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult DeleteProject(int projectId)
        {
            if (!_projectRepository.ProjectExists(projectId))
                return NotFound();

            var projectToDelete = _projectRepository.GetProject(projectId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_projectRepository.DeleteProject(projectToDelete))
                ModelState.AddModelError("", "Something went wrong deleting project");

            return NoContent();
        }
    }
}

