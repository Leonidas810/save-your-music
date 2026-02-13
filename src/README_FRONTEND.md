Frontend structure scaffold

- `src/config` : environment and config helpers
- `src/routes` : thin route definitions (wire into Next.js `app` or API handlers)
- `src/controllers` : request/response logic (OAuth entry points, etc.)
- `src/services` : external API integrations (Spotify, YouTube)
- `src/middleware` : auth/validation middleware
- `src/utils` : helper functions (normalizers, logger)
- `src/types` : shared TypeScript interfaces

Next steps:
- Wire controllers into real API routes in `src/app` or `pages/api`.
- Implement token storage/refresh and real HTTP calls in services.
