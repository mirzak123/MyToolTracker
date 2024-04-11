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
	}
}

