import { env } from '../config';

export async function startSpotifyAuth(req: any, res: any) {
    // Placeholder: build Spotify authorize URL and redirect
    const base = 'https://accounts.spotify.com/authorize';
    const params = new URLSearchParams({
        client_id: env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
        scope: 'playlist-read-private playlist-modify-private',
    });
    return res?.redirect ? res.redirect(`${base}?${params.toString()}`) : { url: `${base}?${params.toString()}` };
}

export async function startYouTubeAuth(req: any, res: any) {
    // Placeholder: build YouTube (Google) OAuth URL
    const base = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
        client_id: env.YOUTUBE_CLIENT_ID,
        response_type: 'code',
        redirect_uri: env.YOUTUBE_REDIRECT_URI,
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube',
        access_type: 'offline',
        prompt: 'consent',
    });
    return res?.redirect ? res.redirect(`${base}?${params.toString()}`) : { url: `${base}?${params.toString()}` };
}
