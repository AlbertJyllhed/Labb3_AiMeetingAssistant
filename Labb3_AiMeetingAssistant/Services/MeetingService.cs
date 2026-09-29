using Labb3_AiMeetingAssistant.Data;
using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Interfaces;
using Labb3_AiMeetingAssistant.Mapping;
using Labb3_AiMeetingAssistant.Models;
using Labb3_AiMeetingAssistant.Utils;
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
            var result = await _ctx.Meetings
                .AsNoTracking()
                .Select(m => m.ToResponse())
                .ToListAsync();

            if (result == null || result.Count == 0)
            {
                return ServiceResult<ICollection<GetMeetingResponse>>
                    .Failure("Det gick inte att hitta några möten");
            }

            return ServiceResult<ICollection<GetMeetingResponse>>.Success(result);
        }

        public async Task<ServiceResult<GetMeetingResponse>> GetMeetingByIdAsync(Guid id)
        {
            var meeting = await _ctx.Meetings
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);

            if (meeting == null)
            {
                return ServiceResult<GetMeetingResponse>
                    .Failure($"Det gick inte att hitta något möte med ID: {id}");
            }

            return ServiceResult<GetMeetingResponse>.Success(meeting.ToResponse());
        }

        public async Task<ServiceResult<GetMeetingResponse>> CreateMeetingAsync(CreateMeetingRequest request)
        {
            var meeting = new Meeting
            {
                Id = Guid.NewGuid(),
                BookedTime = request.BookedDate.ToDateTime(request.BookedTime),
                DurationMin = request.DurationMin,
                Notes = request.Notes,
                BookedLocation = request.BookedLocation,
                Members = [.. request.Members]
            };

            if (meeting == null)
            {
                return ServiceResult<GetMeetingResponse>
                    .Failure("Det gick inte att skapa ett nytt möte");
            }

            await _ctx.AddAsync(meeting);
            await _ctx.SaveChangesAsync();

            return ServiceResult<GetMeetingResponse>.Success(meeting.ToResponse());
        }

        public async Task<ServiceResult<bool>> DeleteMeetingAsync(Guid id)
        {
            var deletedCount = await _ctx.Meetings
                .Where(m => m.Id == id)
                .ExecuteDeleteAsync();

            if (deletedCount == 0)
            {
                return ServiceResult<bool>
                    .Failure($"Det gick inte att hitta något möte med ID: {id}");
            }

            return ServiceResult<bool>.Success(true);
        }
    }
}
