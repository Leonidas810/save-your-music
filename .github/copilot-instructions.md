---
applyTo: "**"
---

## Project Overview

**save-your-music** is a web application that allows users to migrate playlists between YouTube and Spotify.

The main goal is to:

- Authenticate users with YouTube and/or Spotify
- Fetch user playlists from one platform
- Normalize track data
- Match tracks on the destination platform
- Create the equivalent playlist
- Insert matched tracks
- Return a migration summary

This project integrates:

- YouTube Data API v3
- Spotify Web API

Copilot must prioritize clean architecture, modular design, security, and scalability.

---

## Tech Stack

Update this section if needed.

- Frontend: Next.js (React)
- Authentication: OAuth 2.0 (Authorization Code Flow)
- APIs:
  - YouTube Data API v3
  - Spotify Web API
- Environment variable management for secrets

---

## High-Level Architecture

Copilot should follow a layered architecture with clear separation of concerns.

### Folder Structure
/src
/config
/routes
/controllers
/services
/middleware
/utils
/types

### Responsibilities

- routes → Define API endpoints only
- controllers → Handle HTTP request/response logic
- services → Handle business logic and external API communication
- middleware → Authentication and validation
- utils → Helper functions and reusable logic
- config → API configuration and environment variables
- types → Shared interfaces and type definitions

API calls must never be placed directly inside route files.

---

## Authentication

Both YouTube and Spotify must use OAuth 2.0.

### Spotify

- Use Authorization Code Flow
- Handle:
  - access_token
  - refresh_token
  - expiration
- Implement token refresh automatically

### YouTube

- Use OAuth 2.0 via Google Identity
- Request appropriate scopes for:
  - Reading playlists
  - Creating playlists
  - Inserting playlist items

Security rules:

- Validate OAuth state parameter
- Store tokens securely
- Never expose tokens to frontend unnecessarily
- Never hardcode secrets

---

## Environment Variables

All secrets must be stored in environment variables.

Required variables:

SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=

YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REDIRECT_URI=

SESSION_SECRET=



Never commit secrets to version control.

---

## Playlist Migration Flow

The migration process must follow this order:

1. Authenticate user on both platforms
2. Fetch source playlist metadata
3. Fetch all playlist tracks
4. Normalize track data into a common format
5. Search for equivalent tracks on destination platform
6. Create a new playlist
7. Insert matched tracks in batches
8. Return migration summary

## Frontend Routes
- GET / → Landing page
- POST /migrate → Trigger migration process

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
- Return user-friendly error messages without exposing sensitive details