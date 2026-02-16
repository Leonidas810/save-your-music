import { NextResponse } from 'next/server';
import { env } from '@config/index';

const getYouTubeTokens = async (code: string) => {
    try {
        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: env.YOUTUBE_REDIRECT_URI,
            client_id: env.YOUTUBE_CLIENT_ID,
            client_secret: env.YOUTUBE_CLIENT_SECRET,
        });

        const tokenRes = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        if (!tokenRes.ok) {
            const text = await tokenRes.text();
            console.error('YouTube token response error:', text);
            return null;
        }

        return await tokenRes.json();
    } catch (err) {
        console.error('Error fetching YouTube tokens:', err);
        return null;
    }
};

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        if (!code) return NextResponse.redirect(new URL('/migrate', request.url));

        const tokenData = await getYouTubeTokens(code);
        if (!tokenData) return NextResponse.redirect(new URL('/migrate', request.url));

        console.log('YouTube token data:', tokenData);

        const { access_token, refresh_token, expires_in } = tokenData;

        const res = NextResponse.redirect(
            new URL('/migrate?youtube_auth=success', request.url)
        );

        res.cookies.set('youtube_tokens', JSON.stringify({
            access_token,
            refresh_token,
            expires_at: Date.now() + (expires_in || 0) * 1000,
        }), {
            httpOnly: true,
            secure: false, // true in production
            sameSite: 'lax',
            path: '/',
            maxAge: expires_in ?? undefined,
            //domain: env.COOKIE_DOMAIN,
        });

        return res;
    } catch (err) {
        console.error('YouTube callback error:', err);
        const failUrl = new URL('/migrate?youtube_auth=failed', request.url);
        return NextResponse.redirect(failUrl);
    }
}
