using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyToolTrackerAPI.Application.Dtos;
using MyToolTrackerAPI.Application.Interfaces;

namespace MyToolTrackerAPI.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ActivityLogsController : Controller
	{
		private readonly IActivityLogRepository _activityLogRepository;
		private readonly IMapper _mapper;

		public ActivityLogsController(IActivityLogRepository activityLogRepository,
			IMapper mapper)
		{
			_activityLogRepository = activityLogRepository;
			_mapper = mapper;
		}

		[HttpGet("recent")]
		public IActionResult GetRecentActivities()
		{
			var activities = _mapper.Map<List<ActivityLogDto>>(_activityLogRepository.GetRecentActivityLogs(10));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(activities);
		}
	}
}

