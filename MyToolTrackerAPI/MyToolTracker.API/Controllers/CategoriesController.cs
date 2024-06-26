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
	public class CategoriesController : Controller
	{
		private readonly ICategoryRepository _categoryRepository;
		private readonly IMapper _mapper;
		private readonly IActivityLogService _activityLogService;
		private readonly ITokenService _tokenService;

		public CategoriesController(ICategoryRepository categoryRepository,
			IMapper mapper, IActivityLogService activityLogService,
			ITokenService tokenService)
		{
			_categoryRepository = categoryRepository;
			_mapper = mapper;
			_activityLogService = activityLogService;
			_tokenService = tokenService;
		}

		[HttpGet]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Category>))]
		public IActionResult GetCategories()
		{
			var categories = _mapper.Map<List<CategoryDto>>(
				_categoryRepository.GetCategories());

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(categories);
		}

		[HttpGet("{categoryId}")]
		[ProducesResponseType(200, Type = typeof(Category))]
		[ProducesResponseType(400)]
		public IActionResult GetCategory(int categoryId)
		{
			if (!_categoryRepository.CategoryExists(categoryId))
				return NotFound();

			var category = _mapper.Map<CategoryDto>(_categoryRepository.
				GetCategory(categoryId));

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(category);
		}

		[HttpPost]
		[ProducesResponseType(204)]
		[ProducesResponseType(400)]
		public IActionResult CreateCategory(
			[FromBody] CategoryDto categoryCreate)
		{
			// Check if CategoryDto is provided in the body
			if (categoryCreate == null)
				return BadRequest(ModelState);

			// Check if there already exists a Category with the same name
			var category = _categoryRepository.GetCategories()
				.Where(c => c.Name.Trim().ToUpper() == categoryCreate.Name.TrimEnd().ToUpper())
				.FirstOrDefault();

			if (category != null)
			{
                ModelState.AddModelError("", "Category already exists");
				return StatusCode(422, ModelState);
            }

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var categoryMap = _mapper.Map<Category>(categoryCreate);

			if (!_categoryRepository.CreateCategory(categoryMap))
			{
				ModelState.AddModelError("",
					"Something went wrong while saving");
				return StatusCode(500, ModelState);
			}

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Add",
                entityId: categoryMap.Id,
                entityType: "Category",
                description: $"Category \"{categoryMap.Name}\" was added.");

            return Ok("Successfully created");
        }

        [HttpPut("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult UpdateCategory(int categoryId,
            [FromBody] CategoryDto updatedCategory)
        {
            if (updatedCategory == null)
                return BadRequest(ModelState);

            if (categoryId != updatedCategory.Id)
                return BadRequest(ModelState);

            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryMap = _mapper.Map<Category>(updatedCategory);

            if (!_categoryRepository.UpdateCategory(categoryMap))
            {
                ModelState.AddModelError("", "Something went wrong updating category");
                return StatusCode(500, ModelState);
            }

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Update",
                entityId: categoryMap.Id,
                entityType: "Category",
                description: $"Category \"{categoryMap.Name}\" was updated.");

            return NoContent();
        }

        [HttpDelete("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult DeleteCategory(int categoryId)
        {
            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            var categoryToDelete = _categoryRepository.GetCategory(categoryId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_categoryRepository.DeleteCategory(categoryToDelete))
                ModelState.AddModelError("", "Something went wrong deleting category");

            var userId = _tokenService.GetUserIdFromClaims(User);
            _activityLogService.LogActivity(
                userId: userId,
                actionType: "Delete",
                entityId: categoryToDelete.Id,
                entityType: "Category",
                description: $"Category \"{categoryToDelete.Name}\" was deleted.");

            return NoContent();
        }
    }
}

