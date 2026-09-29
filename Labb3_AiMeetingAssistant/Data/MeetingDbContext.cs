using Labb3_AiMeetingAssistant.Models;
using Microsoft.EntityFrameworkCore;

namespace Labb3_AiMeetingAssistant.Data
{
    public class MeetingDbContext : DbContext
    {
        public MeetingDbContext(DbContextOptions<MeetingDbContext> options) : base(options)
        {

        }

        public DbSet<Meeting> Meetings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Meeting>().HasData(
                new Meeting
                {
                    Id = Guid.Parse("a1b2c3d4-0001-4000-8000-000000000001"),
                    BookedTime = new DateTime(2026, 10, 5, 9, 0, 0),
                    DurationMin = 30,
                    Notes = "Weekly sprint planning. Review backlog and assign tasks.",
                    BookedLocation = "Conference Room A",
                    Members = ["Anna Lindqvist", "Erik Johansson", "Sara Berg"]
                },
                new Meeting
                {
                    Id = Guid.Parse("a1b2c3d4-0002-4000-8000-000000000002"),
                    BookedTime = new DateTime(2026, 10, 7, 13, 30, 0),
                    DurationMin = 60,
                    Notes = "Client kickoff meeting. Discuss requirements and timeline.",
                    BookedLocation = null,
                    Members = ["Erik Johansson", "Maria Nilsson"]
                },
                new Meeting
                {
                    Id = Guid.Parse("a1b2c3d4-0003-4000-8000-000000000003"),
                    BookedTime = new DateTime(2026, 10, 9, 15, 0, 0),
                    DurationMin = 45.5,
                    Notes = "Retrospective. What went well, what to improve.",
                    BookedLocation = "Teams (online)",
                    Members = ["Anna Lindqvist", "Sara Berg", "Oskar Lund", "Maria Nilsson"]
                }
            );
        }
    }
}
