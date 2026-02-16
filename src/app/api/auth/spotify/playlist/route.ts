import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const raw = cookieStore.get("spotify_tokens")?.value;

        if (!raw) return NextResponse.json({ authenticated: false });

        const tokens = JSON.parse(raw);
        const { access_token: accessToken } = tokens;

        const url = "https://api.spotify.com/v1/me/playlists";

        const res = await fetch(url, {
            headers: {
                Authorization: 'Bearer ' + `${accessToken}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json({ data: null, authenticated: false }, { status: res.status });
        }

        const playlistsJson = await res.json();


        return NextResponse.json(playlistsJson);

    } catch (err) {
        console.error("Error fetching Spotify playlists:", err);
        return NextResponse.json({ data: null, authenticated: false, error: "Internal server error" }, { status: 500 });
    }
}
