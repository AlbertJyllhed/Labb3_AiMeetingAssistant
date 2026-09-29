using Labb3_AiMeetingAssistant.Utils;

namespace Labb3_AiMeetingAssistant.Interfaces
{
    public interface IAiService
    {
        Task<ServiceResult<string>> SendPrompt(string systemPrompt, string userPrompt);
    }
}
