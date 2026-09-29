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
    }
}
