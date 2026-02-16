import { NextResponse } from 'next/server';
import { env } from '@config/index';

const getSpotifyTokens = async (code: string) => {
    try {
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: env.SPOTIFY_REDIRECT_URI,
        });
        const basic = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
        const tokenRes = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        });
        if (!tokenRes.ok) return null;
        return await tokenRes.json();
    } catch (err) {
        console.error("Error fetching Spotify tokens:", err);
        return null;
    }
};

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        if (!code) return NextResponse.redirect(new URL('/migrate', request.url));

        const tokenData = await getSpotifyTokens(code);
        if (!tokenData) return NextResponse.redirect(new URL('/migrate', request.url));

        const { access_token, refresh_token, expires_in } = tokenData;

        const res = NextResponse.redirect(
            new URL('/migrate?spotify_auth=success', request.url)
        );

        res.cookies.set('spotify_tokens', JSON.stringify({
            access_token,
            refresh_token,
            expires_at: Date.now() + expires_in * 1000,
        }), {
            httpOnly: true,
            secure: false, //true in production
            sameSite: 'lax',
            path: '/',
            maxAge: expires_in,
            //domain: env.COOKIE_DOMAIN,
        });

        return res;
    } catch (err) {
        console.error('Spotify callback error:', err);
        const failUrl = new URL('/migrate?spotify_auth=failed', request.url);
        return NextResponse.redirect(failUrl);
    }
}
