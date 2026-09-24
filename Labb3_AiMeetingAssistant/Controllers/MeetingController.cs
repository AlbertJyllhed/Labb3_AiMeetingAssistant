using Labb3_AiMeetingAssistant.Services;
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

        [HttpPost("agenda")]
        public async Task<IActionResult> CreateMeetingAgenda(string userPrompt)
        {
            var path = Path.Combine(_environment.ContentRootPath, "Prompts", "AgendaSystemPrompt.md");
            var systemPrompt = await System.IO.File.ReadAllTextAsync(path);

            var result = await _aiService.SendPrompt(systemPrompt, userPrompt);
            return Ok(result);
        }
    }
}
