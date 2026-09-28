using Google.GenAI;
using Google.GenAI.Types;
using Labb3_AiMeetingAssistant.Utils;

namespace Labb3_AiMeetingAssistant.Services
{
    public class GeminiService : IAiService
    {
        private readonly string _apiKey;
        private readonly string[] _models;

        public GeminiService(IConfiguration config)
        {
            _apiKey = config["GEMINI_API_KEY"] ?? throw new Exception("Det gick inte att hitta någon API nyckel");
            _models = ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
        }

        public async Task<ServiceResult<string>> SendPrompt(string systemPrompt, string userPrompt)
        {
            var client = new Client(apiKey: _apiKey);

            GenerateContentConfig config = new()
            {
                ResponseMimeType = "application/json",
                SystemInstruction = new Content
                {
                    Parts = [
                        new Part
                        {
                            Text = systemPrompt,
                        }
                    ]
                }
            };

            string? lastError = null;

            foreach (var model in _models)
            {
                try
                {
                    var response = await client.Models.GenerateContentAsync(
                        model: model,
                        contents: userPrompt,
                        config: config
                    );

                    var text = response.Candidates?[0].Content?.Parts?[0].Text;

                    if (text != null)
                    {
                        return ServiceResult<string>.Success(text);
                    }

                    lastError = $"Modellen {model} svarade utan text.";
                }
                catch (Exception ex)
                {
                    lastError = $"Modellen {model} misslyckades: {ex.Message}";
                }
            }

            return ServiceResult<string>.Failure(lastError ?? "Det gick inte att generera ett svar.");
        }
    }
}
