namespace Labb3_AiMeetingAssistant.Models
{
    public class Meeting
    {
        public DateTime BookedTime { get; set; }
        public double Duration { get; set; }
        public List<string> Members { get; set; } = [];
        public string Notes { get; set; } = string.Empty;
    }
}
