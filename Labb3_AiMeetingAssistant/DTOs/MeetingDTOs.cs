using System.ComponentModel.DataAnnotations;

namespace Labb3_AiMeetingAssistant.DTOs
{
    public record GetMeetingResponse
    {
        public int Id { get; set; }
        public DateTime BookedTime { get; set; }
        public double DurationMin { get; set; }
        public string Notes { get; set; } = string.Empty;
        public string? BookedLocation { get; set; }
        public List<string> Members { get; set; } = [];
    }

    public record CreateMeetingRequest
    {
        [Required]
        public DateOnly BookedDate { get; set; }

        [Required]
        public TimeOnly BookedTime { get; set; }

        [Required]
        [Range(10, 120, ErrorMessage = "Ange en giltig tidsram för mötet (min: 10m max: 120m)")]
        public double DurationMin { get; set; }

        [Required]
        [MinLength(10)]
        public string Notes { get; set; } = string.Empty;
        public string? BookedLocation { get; set; }
        public List<string> Members { get; set; } = [];
    }
}
