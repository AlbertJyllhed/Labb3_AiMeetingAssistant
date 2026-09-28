using Labb3_AiMeetingAssistant.Utils;

namespace Labb3_AiMeetingAssistant.Services
{
    public interface IAiService
    {
        Task<ServiceResult<string>> SendPrompt(string systemPrompt, string userPrompt);
    }
}
