import { NextResponse } from 'next/server';
import { env } from '../../../../config';

export async function GET() {
    const base = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
        client_id: env.YOUTUBE_CLIENT_ID,
        response_type: 'code',
        redirect_uri: env.YOUTUBE_REDIRECT_URI,
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube',
        access_type: 'offline',
        prompt: 'consent',
    });
    return NextResponse.redirect(`${base}?${params.toString()}`);
}
