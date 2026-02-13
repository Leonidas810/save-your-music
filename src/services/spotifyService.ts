/* Spotify API client helpers (placeholders).
   Implement token management and API calls here.
*/
export async function getSpotifyAuthUrl(): Promise<string> {
    // Implement building the auth URL in real service
    return '/api/auth/spotify';
}

export async function refreshSpotifyToken(refreshToken: string) {
    // Implement token refresh flow
    return { access_token: '', expires_in: 0 };
}
