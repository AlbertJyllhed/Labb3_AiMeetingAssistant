using Labb3_AiMeetingAssistant.Data;
using Labb3_AiMeetingAssistant.Interfaces;
using Labb3_AiMeetingAssistant.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MeetingDbContext>(options => options.UseSqlite(connectionString));

builder.Services.AddScoped<IAiService, GeminiService>();
builder.Services.AddScoped<IMeetingAiService, MeetingAiService>();
builder.Services.AddScoped<IMeetingService, MeetingService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MeetingDbContext>();
    db.Database.EnsureDeleted(); // For debugging
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Theme = ScalarTheme.Kepler;
        options.DarkMode = true;
    });
}

app.UseHttpsRedirection();

app.UseCors("ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
