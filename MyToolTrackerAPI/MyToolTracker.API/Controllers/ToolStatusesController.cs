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
    public class ToolStatusesController : Controller
    {
        private readonly IToolStatusRepository _toolStatusRepository;
        private readonly IMapper _mapper;

        public ToolStatusesController(
            IToolStatusRepository toolStatusRepository,
            IMapper mapper)
        {
            _toolStatusRepository = toolStatusRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ToolStatus>))]
        public IActionResult GetToolStatuses()
        {
            var toolStatuses = _mapper.Map<List<ToolStatusDto>>(
                _toolStatusRepository.GetToolStatuses());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(toolStatuses);
        }

        [HttpGet("{toolStatusId}")]
        [ProducesResponseType(200, Type = typeof(ToolStatus))]
        [ProducesResponseType(400)]
        public IActionResult GetToolStatus(int toolStatusId)
        {
            if (!_toolStatusRepository.ToolStatusExists(toolStatusId))
                return NotFound();

            var toolStatus = _mapper.Map<ToolStatusDto>(
                _toolStatusRepository.GetToolStatus(toolStatusId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(toolStatus);
        }

    }
}