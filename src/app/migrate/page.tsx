"use client";

import { PageTemplate } from "@/components/templates/Page.template";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { setSpotifyAuth } from "@/lib/slices/authSlice";

export default function MigratePage() {
    const spotify = useAppSelector((s) => s.auth.spotify);
    const youtube = useAppSelector((s) => s.auth.youtube);


    return (
        <div className="min-h-screen dark:bg-black bg-white flex flex-col justify-center">
            <PageTemplate>
                <ClientMigratePageEffect />
                <h1>Start Migration</h1>
                <p>Choose a source and destination platform to migrate your playlists.</p>

                <section className="mt-6">
                    <h2 className="font-semibold">Spotify</h2>
                    {spotify.isAuthenticated ? (
                        <div className="mt-2 text-green-600">This is the logged in user: {spotify.userId ?? "(unknown)"}</div>
                    ) : (
                        <>
                            <a href="/api/auth/spotify">
                                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Login with Spotify</button>
                            </a>
                        </>
                    )}
                </section>

                <section className="mt-6">
                    <h2 className="font-semibold">YouTube</h2>
                    {youtube.isAuthenticated ? (
                        <div className="mt-2 text-green-600">This is the logged in user: {youtube.userId ?? "(unknown)"}</div>
                    ) : (
                        <a href="/api/auth/youtube">
                            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Login with YouTube</button>
                        </a>
                    )}
                </section>
            </PageTemplate>
        </div>
    );
}

// client-side effect: if not already marked authenticated, detect spotify callback
// via query param or cookie and dispatch a quick auth update so UI reflects login.
export function ClientMigratePageEffect() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        try {
            if (typeof window === "undefined") return;
            const url = new URL(window.location.href);
            const spotifyAuth = url.searchParams.get("spotify_auth");
            const cookieHasSpotify = document.cookie.split(";").some((c) => c.trim().startsWith("spotify_auth="));
            if (spotifyAuth === "success" || cookieHasSpotify) {
                dispatch(setSpotifyAuth({ isAuthenticated: true }));
                // remove the query param to keep URL clean
                url.searchParams.delete("spotify_auth");
                window.history.replaceState({}, "", url.toString());
            }
        } catch (err) {
            // no-op
        }
    }, [dispatch]);
    return null;
}
