namespace Labb3_AiMeetingAssistant.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public DateTime BookedTime { get; set; }
        public double DurationMin { get; set; }
        public string Notes { get; set; } = string.Empty;
        public string? BookedLocation { get; set; }
        public List<string> Members { get; set; } = [];
    }
}
