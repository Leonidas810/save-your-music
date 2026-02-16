import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const fetchUserInfo = async (accessToken: string) => {
    const url = 'https://www.googleapis.com/youtube/v3/channels';

    return fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'omit',
    });
};


export async function GET() {
    try {
        const cookieStore = await cookies();
        const raw = cookieStore.get('youtube_tokens')?.value;

        if (!raw) return NextResponse.json({ authenticated: false });

        const tokens = JSON.parse(raw as string);
        const { access_token: accessToken, refresh_token: refreshToken } = tokens;

        const res = await fetchUserInfo(accessToken);
        console.log('YouTube user info response:', res);        

        if (!res.ok) return NextResponse.json({ user: null, authenticated: false }, { status: res.status });
        
        const meJson = await res.json();
        return NextResponse.json({ user: meJson, authenticated: true });

    } catch (err) {
        console.error('Error fetching YouTube me:', err);
        return NextResponse.json({ authenticated: false, error: 'Internal server error' }, { status: 500 });
    }
}