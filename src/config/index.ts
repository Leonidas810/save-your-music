/* Centralized config helpers for environment variables */
export const env = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || '',
    YOUTUBE_CLIENT_ID: process.env.YOUTUBE_CLIENT_ID || '',
    YOUTUBE_CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET || '',
    YOUTUBE_REDIRECT_URI: process.env.YOUTUBE_REDIRECT_URI || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
};

export default env;
