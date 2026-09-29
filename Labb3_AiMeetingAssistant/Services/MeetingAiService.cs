using Labb3_AiMeetingAssistant.Interfaces;
using Labb3_AiMeetingAssistant.Utils;
using System.Text.Json;

namespace Labb3_AiMeetingAssistant.Services
{
    public class MeetingAiService : IMeetingAiService
    {
        private static readonly Dictionary<AiTask, string> PromptFiles = new()
        {
            [AiTask.Summary] = "meeting-summary-instructions.md",
            [AiTask.Agenda] = "meeting-agenda-instructions.md",
            [AiTask.Invite] = "meeting-invite-instructions.md",
        };

        private readonly IMeetingService _meetingService;
        private readonly IAiService _aiService;
        private readonly IHostEnvironment _environment;

        public MeetingAiService(
            IMeetingService meetingService,
            IAiService aiService,
            IHostEnvironment environment)
        {
            _meetingService = meetingService;
            _aiService = aiService;
            _environment = environment;
        }

        public async Task<ServiceResult<string>> GenerateAsync(Guid meetingId, AiTask task)
        {
            var meetingResult = await _meetingService.GetMeetingByIdAsync(meetingId);

            if (!meetingResult.IsSuccess || meetingResult.Data is null)
            {
                return ServiceResult<string>.Failure(
                    meetingResult.ErrorMessage ?? "Mötet hittades inte");
            }

            var meeting = meetingResult.Data;

            var path = Path.Combine(_environment.ContentRootPath, "Prompts", PromptFiles[task]);
            var systemPrompt = await File.ReadAllTextAsync(path);

            var userMessage = JsonSerializer.Serialize(new
            {
                bookedTime = meeting.BookedTime.ToString("s"),
                duration = meeting.DurationMin,
                members = meeting.Members,
                location = meeting.BookedLocation,
                notes = meeting.Notes,
                today = DateTime.Now.ToString("yyyy-MM-dd")
            });

            return await _aiService.SendPrompt(systemPrompt, userMessage);
        }
    }
}
