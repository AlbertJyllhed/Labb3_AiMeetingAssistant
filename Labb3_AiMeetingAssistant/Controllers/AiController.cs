using Labb3_AiMeetingAssistant.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Labb3_AiMeetingAssistant.Controllers
{
    [Route("api/ai")]
    [ApiController]
    public class AiController : ControllerBase
    {
        private readonly IMeetingAiService _meetingAiService;

        public AiController(IMeetingAiService meetingAiService)
        {
            _meetingAiService = meetingAiService;
        }

        [HttpPost("summary/{meetingId:guid}")]
        [EndpointSummary("Sammanfatta Mötesanteckningar")]
        public async Task<IActionResult> SummarizeMeetingNotes(Guid meetingId)
        {
            return await Generate(meetingId, AiTask.Summary);
        }

        [HttpPost("agenda/{meetingId:guid}")]
        [EndpointSummary("Generera Mötesagenda")]
        public async Task<IActionResult> CreateMeetingAgenda(Guid meetingId)
        {
            return await Generate(meetingId, AiTask.Agenda);
        }

        [HttpPost("invite/{meetingId:guid}")]
        [EndpointSummary("Skapa Mötesinbjudan")]
        public async Task<IActionResult> CreateMeetingInvite(Guid meetingId)
        {
            return await Generate(meetingId, AiTask.Invite);
        }

        private async Task<IActionResult> Generate(Guid meetingId, AiTask task)
        {
            var result = await _meetingAiService.GenerateAsync(meetingId, task);

            if (!result.IsSuccess)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Content(result.Data!, "application/json");
        }
    }
}
