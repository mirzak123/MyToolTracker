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
	public class ToolsController : Controller
	{
        private readonly IToolRepository _toolRepository;
        private readonly IMapper _mapper;

        public ToolsController(IToolRepository toolRepository, IMapper mapper)
        {
            _toolRepository = toolRepository;
            _mapper = mapper;
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
    }
}

