# AI Meeting Assistant

A full-stack web application for booking meetings and using generative AI to turn the meeting notes into something useful. Pick a booked meeting and, with one click, let Google Gemini produce a **summary**, a **timed agenda**, or a ready-to-send **meeting invitation**.

The backend is an ASP.NET Core Web API (.NET 10) and the frontend is a React + TypeScript single-page app built with Vite. The AI output and the UI are in Swedish.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Supply your own Gemini API key (User Secrets)](#1-supply-your-own-gemini-api-key-user-secrets)
  - [2. Run the backend](#2-run-the-backend)
  - [3. Run the frontend](#3-run-the-frontend)
- [API overview](#api-overview)
- [Methodology and architecture](#methodology-and-architecture)
- [Notes and limitations](#notes-and-limitations)

---

## Features

**Meeting management**

- Create a meeting with date and time, duration, notes, an optional location and a comma-separated list of participants.
- List all booked meetings as cards.
- Open a meeting in a detail view.
- Delete a meeting (with a confirmation prompt).

**AI-generated content (Google Gemini)**

| Action | Result |
| --- | --- |
| **Sammanfatta Mötesanteckningar** (Summarize) | Title, summary, key points, decisions, action items (task, owner, deadline) and open questions |
| **Generera Mötesagenda** (Generate agenda) | A sequential, timed agenda with an owner and a short description for each item |
| **Skapa Mötesinbjudan** (Create invitation) | Subject line, body text, start/end time and attendees, ready to use in a calendar event |

Each result is rendered in its own dedicated card component.

---

## Tech stack

**Backend** (`Labb3_AiMeetingAssistant`)

- C# / ASP.NET Core Web API on **.NET 10**
- **Entity Framework Core** with **SQLite**
- **Google.GenAI** SDK for Gemini
- **OpenAPI** + **Scalar** for interactive API documentation
- User Secrets for local secret management

**Frontend** (`ai-meeting-assistant`)

- **React** with **TypeScript**
- **Vite** as build tool and dev server
- **React Router** for routing
- **Font Awesome** for icons
- **openapi-typescript** for generating API types from the backend's OpenAPI document
- Plain CSS, one stylesheet per component

---

## Project structure

```
.
├── Labb3_AiMeetingAssistant/          # ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── MeetingController.cs       # CRUD endpoints for meetings
│   │   └── AiController.cs            # Summary / agenda / invite endpoints
│   ├── Services/
│   │   ├── MeetingService.cs          # Database logic for meetings
│   │   ├── MeetingAiService.cs        # Builds prompts and orchestrates AI generation
│   │   └── GeminiService.cs           # Talks to the Gemini API
│   ├── Interfaces/                    # IMeetingService, IAiService, IMeetingAiService
│   ├── Models/Meeting.cs              # EF Core entity
│   ├── DTOs/MeetingDTOs.cs            # Request/response records + validation
│   ├── Mapping/MeetingMappings.cs     # Entity -> DTO extension methods
│   ├── Data/MeetingDbContext.cs       # DbContext + seed data
│   ├── Utils/ServiceResult.cs         # Result wrapper used by all services
│   ├── Prompts/                       # System prompts (Markdown) for each AI task
│   │   ├── meeting-summary-instructions.md
│   │   ├── meeting-agenda-instructions.md
│   │   └── meeting-invite-instructions.md
│   └── Program.cs                     # DI, CORS, OpenAPI/Scalar, DB setup
│
└── ai-meeting-assistant/              # React + TypeScript frontend
    ├── src/
    │   ├── components/                # MeetingCard, CreateMeetingForm, MeetingHandler,
    │   │                              # SummaryCard, AgendaCard, InviteCard,
    │   │                              # AiResultSelector, LoadingCard, ErrorCard
    │   ├── hooks/                     # useMeetingApi, useAiApi
    │   ├── pages/                     # MeetingListPage, MeetingDetailsPage
    │   ├── types/                     # api.ts (generated) and types.ts
    │   ├── App.tsx
    │   └── main.tsx
    └── .env                           # API base URLs
```

---

## Getting started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (LTS) and npm
- Visual Studio 2022 or later (recommended for the backend) or the `dotnet` CLI
- A **Google Gemini API key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Supply your own Gemini API key (User Secrets)

> **Important:** This repository does **not** include an API key. You must supply your own Gemini API key through **.NET User Secrets**. Without it, the backend will throw an exception on startup when the AI service is created ("Det gick inte att hitta någon API nyckel"), and no AI features will work.

The key is read from the configuration key `GEMINI_API_KEY`. The project already has a `UserSecretsId`, so you only need to add the secret.

**Option A: Visual Studio**

1. Right-click the `Labb3_AiMeetingAssistant` project in Solution Explorer.
2. Select **Manage User Secrets**. A `secrets.json` file opens.
3. Add your key:

   ```json
   {
     "GEMINI_API_KEY": "your-gemini-api-key-here"
   }
   ```

4. Save the file.

**Option B: .NET CLI**

From inside the `Labb3_AiMeetingAssistant` folder:

```bash
dotnet user-secrets set "GEMINI_API_KEY" "your-gemini-api-key-here"
```

User Secrets are stored outside the project folder (in your user profile), so your key is never committed to Git. **Never** put the key in `appsettings.json` or any other tracked file.

### 2. Run the backend

1. Open the solution in Visual Studio and start the **https** launch profile, or run:

   ```bash
   cd Labb3_AiMeetingAssistant
   dotnet run --launch-profile https
   ```

2. The API runs on `https://localhost:7285` (and `http://localhost:5166`).
3. In Development, interactive API docs are available at `https://localhost:7285/scalar`.

If your browser doesn't trust the local HTTPS certificate, run `dotnet dev-certs https --trust` once.

### 3. Run the frontend

```bash
cd ai-meeting-assistant
npm install
npm run dev
```

The app is served on `http://localhost:5173`. That origin is the only one allowed by the backend's CORS policy.

The API URLs are configured in `ai-meeting-assistant/.env`:

```
VITE_MEETING_API_URL=https://localhost:7285/api/meetings
VITE_AI_API_URL=https://localhost:7285/api/ai
```

If you change the backend port, update these values accordingly.

---

## API overview

### Meetings: `/api/meetings`

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/meetings` | Get all meetings |
| `GET` | `/api/meetings/{id}` | Get a single meeting |
| `POST` | `/api/meetings/create` | Create a meeting (returns `201 Created`) |
| `DELETE` | `/api/meetings/{id}` | Delete a meeting (returns `204 No Content`) |

**Validation on create:** date, time, duration and notes are required; duration must be between **10 and 120 minutes**; notes must be at least **10 characters**.

### AI: `/api/ai`

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/ai/summary/{meetingId}` | Summarize the meeting notes |
| `POST` | `/api/ai/agenda/{meetingId}` | Generate a timed agenda |
| `POST` | `/api/ai/invite/{meetingId}` | Create a meeting invitation |

All AI endpoints return the model's response as `application/json`.

---

## Methodology and architecture

### Layered backend with dependency injection

The backend follows a controller → service → data access structure, with everything wired up through ASP.NET Core's built-in dependency injection and programmed against interfaces:

- **Controllers** are thin. They call a service and translate the result into an HTTP response.
- **Services** hold the logic. `MeetingService` handles persistence, `MeetingAiService` coordinates the AI flow, and `GeminiService` is the only class that knows about Gemini. Because it sits behind `IAiService`, the AI provider can be swapped without touching the rest of the code.
- **DTOs and mapping** separate the API contract from the database entity. Request validation is declared with data annotations on the DTOs.

### Result pattern

Services return a `ServiceResult<T>` (`IsSuccess`, `Data`, `ErrorMessage`) instead of throwing exceptions for expected failures such as "meeting not found". Controllers map failures to the appropriate HTTP status, and error messages are plain text so the frontend can show them directly.

### Prompt-driven AI generation

Each AI feature is defined by a **system prompt stored as a Markdown file** in the `Prompts/` folder, so behavior can be tuned without recompiling. The flow for an AI request is:

1. `MeetingAiService` loads the meeting from the database.
2. It reads the system prompt matching the requested task (summary, agenda or invite).
3. It serializes the meeting into a small JSON user message (`bookedTime`, `duration`, `members`, `location`, `notes` and `today`).
4. `GeminiService` sends system prompt and user message to Gemini with `ResponseMimeType = "application/json"`.
5. The JSON is returned to the frontend untouched.

The prompts are written to get reliable, structured output:

- They define the exact input and output JSON schema, and demand a **JSON-only** response.
- They contain explicit anti-hallucination rules: the model must not invent participants, decisions, action items or other details that are not in the notes.
- They specify handling of edge cases such as an empty participant list, a `null` location, notes written before the meeting rather than after, and short meetings (for example, a limit on the number of agenda items and rules for time allocation).
- Dates are passed as local time and never converted between time zones.

### Model fallback

`GeminiService` holds an ordered list of Gemini Flash models. If a request to one model fails or returns no text, the service moves on to the next model, and only returns an error if all of them fail.

### Frontend

- **Custom hooks** (`useMeetingApi`, `useAiApi`) encapsulate all network access, loading state and error handling, which keeps the components focused on rendering.
- **Type safety end to end:** TypeScript types for the backend contract are generated from the OpenAPI document with `openapi-typescript` (`src/types/api.ts`). The AI response shapes are modeled as a **discriminated union** (`AiResult`, keyed on `kind`), which lets `AiResultSelector` render the correct card with an exhaustive `switch`.
- **Clear UI states:** loading, error and result views are separate components (`LoadingCard`, `ErrorCard`, and the result cards), and the AI buttons are disabled while a request is running.
- **Routing:** `/` shows the list and creation form, `/meetings/:id` shows the meeting handler, and unknown routes show a "not found" error card.

To regenerate the API types after changing the backend, run the backend and then, for example:

```bash
npx openapi-typescript https://localhost:7285/openapi/v1.json -o src/types/api.ts
```

---

## Notes and limitations

- **The database is recreated on every start.** `Program.cs` calls `EnsureDeleted()` followed by `EnsureCreated()` (marked as debug behavior), so all meetings are reset to the three seeded sample meetings each time the backend starts. Remove `EnsureDeleted()` if you want persistent data.
- The SQLite database file (`meetings.db`) is created in the backend's working directory.
- AI output is generated by a language model and may contain mistakes. Review it before using it.
- The AI prompts and the user interface are written in Swedish.
