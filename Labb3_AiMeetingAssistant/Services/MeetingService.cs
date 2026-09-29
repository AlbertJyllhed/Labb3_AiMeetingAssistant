using Labb3_AiMeetingAssistant.Data;
using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Interfaces;
using Labb3_AiMeetingAssistant.Utils;
using Labb3_AiMeetingAssistant.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Labb3_AiMeetingAssistant.Services
{
    public class MeetingService : IMeetingService
    {
        private readonly MeetingDbContext _ctx;

        public MeetingService(MeetingDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<ServiceResult<ICollection<GetMeetingResponse>>> GetMeetingsAsync()
        {
            var result = _ctx.Meetings.ToResponse();

            if (result == null || result.Count == 0)
            {
                return ServiceResult<ICollection<GetMeetingResponse>>
                    .Failure("Det gick inte att hitta några möten");
            }

            return ServiceResult<ICollection<GetMeetingResponse>>.Success(result);
        }

        public async Task<ServiceResult<GetMeetingResponse>> GetMeetingByIdAsync(int id)
        {

        }

        public async Task<ServiceResult<GetMeetingResponse>> CreateMeetingAsync(CreateMeetingRequest request)
        {

        }
    }
}
