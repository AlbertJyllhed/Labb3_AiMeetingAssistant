using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Labb3_AiMeetingAssistant.Controllers
{
    [Route("api/meetings")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingService _meetingService;

        public MeetingController(IMeetingService meetingService)
        {
            _meetingService = meetingService;
        }

        [HttpGet]
        [EndpointSummary("Hämta Mötesbokningar")]
        public async Task<ActionResult<ICollection<GetMeetingResponse>>> GetMeetings()
        {
            var response = await _meetingService.GetMeetingsAsync();

            if (!response.IsSuccess)
            {
                return NotFound(response.ErrorMessage);
            }

            return Ok(response.Data);
        }

        [HttpGet("{id}")]
        [EndpointSummary("Hämta Mötesbokning")]
        public async Task<ActionResult<GetMeetingResponse>> GetMeetingById(Guid id)
        {
            var response = await _meetingService.GetMeetingByIdAsync(id);

            if (!response.IsSuccess)
            {
                return NotFound(response.ErrorMessage);
            }

            return Ok(response.Data);
        }

        [HttpPost("create")]
        [EndpointSummary("Skapa Nytt Möte")]
        public async Task<IActionResult> CreateMeeting(CreateMeetingRequest request)
        {
            var response = await _meetingService.CreateMeetingAsync(request);

            if (!response.IsSuccess)
            {
                return NotFound(response.ErrorMessage);
            }

            return CreatedAtAction(
                nameof(GetMeetingById), new { id = response.Data?.Id }, response.Data);
        }

        [HttpDelete("delete")]
        [EndpointSummary("Ta bort Möte")]
        public async Task<IActionResult> DeleteMeeting(Guid id)
        {
            var result = await _meetingService.DeleteMeetingAsync(id);

            if (!result.IsSuccess)
            {
                return NotFound(result.ErrorMessage);
            }

            return NoContent();
        }
    }
}
