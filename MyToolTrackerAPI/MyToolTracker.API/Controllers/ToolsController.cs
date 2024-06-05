using System.Security.Claims;
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
    public class ToolsController : Controller
    {
        private readonly IActivityLogService _activityLogService;
        private readonly IToolRepository _toolRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public ToolsController(IToolRepository toolRepository, IMapper mapper,
            IActivityLogService activityLogService,
            ITokenService tokenService)
        {
            _activityLogService = activityLogService;
            _toolRepository = toolRepository;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Tool>))]
        public IActionResult GetTools()
        {
            var tools = _mapper.Map<List<ToolDto>>(_toolRepository.GetTools());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tools);
        }

        [HttpGet("{toolId}")]
        [ProducesResponseType(200, Type = typeof(Tool))]
        [ProducesResponseType(400)]
        public IActionResult GetTool(int toolId)
        {
            if (!_toolRepository.ToolExists(toolId))
                return NotFound();

            var tool = _mapper.Map<ToolDto>(_toolRepository.GetTool(toolId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tool);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTool(ToolDto toolCreate)
        {
            if (toolCreate == null)
                return BadRequest(ModelState);

            toolCreate.EntryDate = DateTime.Now;

            var tool = _toolRepository.GetTools()
                .Where(t => t.Barcode.Trim() ==
                toolCreate.Barcode.Trim()).FirstOrDefault();

            if (tool != null)
            {
                ModelState.AddModelError("", "Tool already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toolMap = _mapper.Map<Tool>(toolCreate);

            if (!_toolRepository.CreateTool(toolMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Add",
                entityId: toolMap.Id,
                entityType: "Tool",
                description: $"Tool \"{toolMap.Name}\" was added.");

            return Ok("Successfully created");
        }

        [HttpPut("{toolId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult UpdateTool(int toolId,
            [FromBody] ToolDto updatedTool)
        {
            if (updatedTool == null)
                return BadRequest(ModelState);

            if (toolId != updatedTool.Id)
                return BadRequest(ModelState);

            if (!_toolRepository.ToolExists(toolId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toolMap = _mapper.Map<Tool>(updatedTool);

            if (!_toolRepository.UpdateTool(toolMap))
            {
                ModelState.AddModelError("", "Something went wrong updating tool");
                return StatusCode(500, ModelState);
            }

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Update",
                entityId: toolId,
                entityType: "Tool",
                description: $"Tool \"{toolMap.Name}\" was updated.");

            return NoContent();
        }

        [HttpDelete("{toolId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult DeleteTool(int toolId)
        {
            if (!_toolRepository.ToolExists(toolId))
                return NotFound();

            var toolToDelete = _toolRepository.GetTool(toolId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_toolRepository.DeleteTool(toolToDelete))
                ModelState.AddModelError("", "Something went wrong deleting tool");

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Delete",
                entityId: toolId,
                entityType: "Tool",
                description: $"Tool \"{toolToDelete.Name}\" was deleted.");

            return NoContent();
        }
    }
}

