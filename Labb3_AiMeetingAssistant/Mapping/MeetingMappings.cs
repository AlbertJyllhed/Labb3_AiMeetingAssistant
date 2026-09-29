using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Models;

namespace Labb3_AiMeetingAssistant.Mapping
{
    public static class MeetingMappings
    {
        public static Meeting ToEntity(this CreateMeetingRequest request) => new()
        {
            BookedTime = request.BookedDate.ToDateTime(request.BookedTime),
            DurationMin = request.DurationMin,
            Notes = request.Notes,
            BookedLocation = request.BookedLocation,
            Members = [.. request.Members]
        };

        public static GetMeetingResponse ToResponse(this Meeting meeting) => new()
        {
            BookedTime = meeting.BookedTime,
            DurationMin = meeting.DurationMin,
            Notes = meeting.Notes,
            BookedLocation = meeting.BookedLocation,
            Members = [.. meeting.Members]
        };

        public static List<GetMeetingResponse> ToResponse(this IEnumerable<Meeting> meetings) =>
            meetings.Select(m => m.ToResponse()).ToList();
    }
}
