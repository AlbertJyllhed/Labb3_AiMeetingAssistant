namespace Labb3_AiMeetingAssistant.Services
{
    public interface IAiService
    {
        Task<string> SendPrompt(string systemPrompt, string userPrompt);
    }
}
