using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Utils;

namespace Labb3_AiMeetingAssistant.Interfaces
{
    public interface IMeetingService
    {
        Task<ServiceResult<ICollection<GetMeetingResponse>>> GetMeetingsAsync();
        Task<ServiceResult<GetMeetingResponse>> GetMeetingByIdAsync(int id);
        Task<ServiceResult<GetMeetingResponse>> CreateMeetingAsync(CreateMeetingRequest request);
    }
}
