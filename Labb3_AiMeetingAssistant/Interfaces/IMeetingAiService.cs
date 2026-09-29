using Labb3_AiMeetingAssistant.Utils;

namespace Labb3_AiMeetingAssistant.Interfaces
{
    public enum AiTask { Summary, Agenda, Invite }

    public interface IMeetingAiService
    {
        Task<ServiceResult<string>> GenerateAsync(Guid meetingId, AiTask task);
    }
}
