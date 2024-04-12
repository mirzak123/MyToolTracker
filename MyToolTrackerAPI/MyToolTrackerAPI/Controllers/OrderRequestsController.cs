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
    public class OrderRequestsController : Controller
    {
        private readonly IOrderRequestRepository _orderRequestRepository;
        private readonly IMapper _mapper;

        public OrderRequestsController(IOrderRequestRepository orderRequestRepository,
            IMapper mapper)
        {
            _orderRequestRepository = orderRequestRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OrderRequest>))]
        public IActionResult GetOrderRequests()
        {
            var orderRequests = _mapper.Map<List<OrderRequestDto>>(_orderRequestRepository
                .GetOrderRequests());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(orderRequests);
        }

        [HttpGet("{orderRequestId}")]
        [ProducesResponseType(200, Type = typeof(OrderRequest))]
        [ProducesResponseType(400)]
        public IActionResult OrderRequest(int orderRequestId)
        {
            if (!_orderRequestRepository.OrderRequestExists(orderRequestId))
                return NotFound();

            var orderRequest = _mapper.Map<OrderRequestDto>(_orderRequestRepository
                .GetOrderRequest(orderRequestId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(orderRequest);
        }
    }
}

