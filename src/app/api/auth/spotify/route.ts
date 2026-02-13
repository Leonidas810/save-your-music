import { NextResponse } from 'next/server';
import { env } from '../../../../config';

export async function GET() {
  const base = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    client_id: env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
    scope: 'playlist-read-private playlist-modify-private',
  });
  return NextResponse.redirect(`${base}?${params.toString()}`);
}
