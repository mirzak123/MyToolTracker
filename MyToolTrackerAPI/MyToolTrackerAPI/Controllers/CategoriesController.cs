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
	public class CategoriesController : Controller
	{
		private readonly ICategoryRepository _categoryRepository;
		private readonly IMapper _mapper;

		public CategoriesController(ICategoryRepository categoryRepository,
			IMapper mapper)
		{
			_categoryRepository = categoryRepository;
			_mapper = mapper;
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

			return Ok("Successfully created");
        }
	}
}

