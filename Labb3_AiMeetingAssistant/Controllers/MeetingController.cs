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
        private readonly IWebHostEnvironment _environment;

        public MeetingController(IAiService aiService, IWebHostEnvironment environment)
        {
            _aiService = aiService;
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
        #endregion
    }
}
