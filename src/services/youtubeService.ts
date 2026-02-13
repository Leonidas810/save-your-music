/* YouTube API client helpers (placeholders).
   Implement token exchange and playlist fetching here.
*/
export async function getYouTubeAuthUrl(): Promise<string> {
    return '/api/auth/youtube';
}

export async function fetchYouTubePlaylists(accessToken: string) {
    return [];
}
