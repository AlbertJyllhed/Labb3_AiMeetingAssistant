using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Interfaces;
using Labb3_AiMeetingAssistant.Models;
using Microsoft.AspNetCore.Mvc;

namespace Labb3_AiMeetingAssistant.Controllers
{
    [Route("api/meetings")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IAiService _aiService;
        private readonly IMeetingService _meetingService;
        private readonly IWebHostEnvironment _environment;

        public MeetingController(
            IAiService aiService,
            IMeetingService meetingService,
            IWebHostEnvironment environment)
        {
            _aiService = aiService;
            _meetingService = meetingService;
            _environment = environment;
        }

        #region AI-Endpoints
        [HttpPost("summary")]
        [EndpointSummary("Sammanfatta Mötesanteckningar")]
        public async Task<IActionResult> SummarizeMeetingNotes(Meeting meeting)
        {
            var path = Path.Combine(_environment.ContentRootPath, "Prompts", "meeting-agenda-instructions.md"); // change to new instructions
            var systemPrompt = await System.IO.File.ReadAllTextAsync(path);

            var result = await _aiService.SendPrompt(systemPrompt, meeting.Notes);
            return Ok(result);
        }

        [HttpPost("agenda")]
        [EndpointSummary("Generera Mötesagenda")]
        public async Task<IActionResult> CreateMeetingAgenda(Meeting meeting)
        {
            var path = Path.Combine(_environment.ContentRootPath, "Prompts", "meeting-agenda-instructions.md");
            var systemPrompt = await System.IO.File.ReadAllTextAsync(path);

            var result = await _aiService.SendPrompt(systemPrompt, meeting.Notes);
            return Ok(result);
        }

        [HttpPost("invite")]
        [EndpointSummary("Skapa Mötesinbjudan")]
        public async Task<IActionResult> CreateMeetingInvite(Meeting meeting)
        {
            var path = Path.Combine(_environment.ContentRootPath, "Prompts", "meeting-agenda-instructions.md"); // change to new instructions
            var systemPrompt = await System.IO.File.ReadAllTextAsync(path);

            var result = await _aiService.SendPrompt(systemPrompt, meeting.Notes);
            return Ok(result);
        }
        #endregion

        #region CRUD-Endpoints
        [HttpGet("meetings")]
        [EndpointSummary("Hämta Mötesbokningar")]
        public async Task<ActionResult<ICollection<GetMeetingResponse>>> GetMeetings()
        {
            var response = await _meetingService.GetMeetingsAsync();
            return Ok(response);
        }

        [HttpGet("meeting")]
        [EndpointSummary("Hämta Mötesbokning")]
        public async Task<ActionResult<GetMeetingResponse>> GetMeetingById(int id)
        {
            var response = await _meetingService.GetMeetingByIdAsync(id);
            return Ok(response);
        }

        [HttpPost("create-meeting")]
        [EndpointSummary("Skapa Nytt Möte")]
        public async Task<IActionResult> CreateMeeting(CreateMeetingRequest request)
        {
            var response = await _meetingService.CreateMeetingAsync(request);
            return Ok(response);
        }
        #endregion
    }
}
