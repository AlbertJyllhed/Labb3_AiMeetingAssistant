using Google.GenAI;
using Google.GenAI.Types;

namespace Labb3_AiMeetingAssistant.Services
{
    public class GeminiService : IAiService
    {
        private readonly string _apiKey;
        private readonly string[] _models;

        public GeminiService(IConfiguration config)
        {
            _apiKey = config["GEMINI_API_KEY"] ?? throw new Exception("Det gick inte att hitta någon API nyckel");
            _models = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
        }

        public async Task<string> SendPrompt(string systemPrompt, string userPrompt)
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

            var response = await TryGenerateResponse(client, userPrompt, config);

            return response.Candidates?[0].Content?.Parts?[0].Text ?? "";
        }

        private async Task<GenerateContentResponse> TryGenerateResponse(Client client, string userPrompt, GenerateContentConfig config)
        {
            GenerateContentResponse? response = null;

            foreach (var model in _models)
            {
                try
                {
                    response = await client.Models.GenerateContentAsync(model: model, contents: userPrompt, config);
                    break; // första bästa modellen som fungerar avbryter loopen
                }
                catch (ApiException ex)
                {
                    Console.WriteLine($"{model} modellen misslyckades: {ex.Message}");
                }
            }

            if (response is null)
            {
                throw new InvalidOperationException("Det gick inte att generera ett svar");
            }

            return response;
        }
    }
}
