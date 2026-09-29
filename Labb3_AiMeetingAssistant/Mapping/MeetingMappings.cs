using Labb3_AiMeetingAssistant.DTOs;
using Labb3_AiMeetingAssistant.Models;

namespace Labb3_AiMeetingAssistant.Mapping
{
    public static class MeetingMappings
    {
        public static GetMeetingResponse ToResponse(this Meeting meeting) => new()
        {
            Id = meeting.Id,
            BookedTime = meeting.BookedTime,
            DurationMin = meeting.DurationMin,
            Notes = meeting.Notes,
            BookedLocation = meeting.BookedLocation,
            Members = [.. meeting.Members]
        };
    }
}
