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

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateOrderRequest(
            [FromBody] OrderRequestDto orderRequestCreate)
        {
            if (orderRequestCreate == null)
            {
                ModelState.AddModelError("", "it is null");
                return BadRequest(ModelState);
            }
              

            // TODO: implement check for the same existing order request

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "it is not valid");
                return BadRequest(ModelState);
            }

            var orderRequestMap = _mapper.Map<OrderRequest>(orderRequestCreate);

            if (!_orderRequestRepository.CreateOrderRequest(orderRequestMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{orderRequestId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult UpdateOrderRequest(int orderRequestId,
            [FromBody] OrderRequestDto updatedOrderRequest)
        {
            if (updatedOrderRequest == null)
                return BadRequest(ModelState);

            if (orderRequestId != updatedOrderRequest.Id)
                return BadRequest(ModelState);

            if (!_orderRequestRepository.OrderRequestExists(orderRequestId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderRequstMap = _mapper.Map<OrderRequest>(updatedOrderRequest);

            if (!_orderRequestRepository.UpdateOrderRequest(orderRequstMap))
            {
                ModelState.AddModelError("", "Something went wrong updating order request");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{orderRequestId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public IActionResult DeleteOrderRequest(int orderRequestId)
        {
            if (!_orderRequestRepository.OrderRequestExists(orderRequestId))
                return NotFound();

            var orderRequestToDelete = _orderRequestRepository.GetOrderRequest(orderRequestId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_orderRequestRepository.DeleteOrderRequest(orderRequestToDelete))
                ModelState.AddModelError("", "Something went wrong deleting order request");

            return NoContent();
        }
    }
}

