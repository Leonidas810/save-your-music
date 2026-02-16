"use client";

import { PageTemplate } from "@/components/templates/Page.template";
import { useAppSelector, useAppDispatch } from "@/lib/Redux/useRedux";
import { setSpotifyAuth } from "@/lib/Redux/slices/authSlice";

import { Playlist, PaginateResponse } from "@/types";

import { useQuery } from '@tanstack/react-query'

export default function MigratePage() {
    const spotify = useAppSelector((s) => s.auth.spotify);
    const youtube = useAppSelector((s) => s.auth.youtube);
    const dispatch = useAppDispatch();

    const { data: authData } = useQuery({
        queryKey: ["spotifyAuth"],
        queryFn: async () => {
            const res = await fetch("/api/auth/spotify/me");
            const data = await res.json();
            dispatch(setSpotifyAuth({
                user: data.user,
                isAuthenticated: data.authenticated,
                expiresAt: data.expiresAt,
            }));
            return data;
        },
    });

    const { data: playlistData, isLoading: isPlaylistLoading } = useQuery<PaginateResponse<Playlist>>({
        queryKey: ["spotifyPlaylists"],
        queryFn: async () => {
            const res = await fetch("/api/auth/spotify/playlist");
            return res.json();
        },
        enabled: authData?.authenticated ?? false,
    });

    return (
        <div className="min-h-screen dark:bg-black bg-white flex flex-col justify-center">
            <PageTemplate>
                <h1>Start Migration</h1>
                <p>Choose a source and destination platform to migrate your playlists.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <section className="mt-6">
                        <h2 className="font-semibold mb-2">Spotify</h2>
                        {spotify.isAuthenticated && spotify.user ? (
                            <div className="border-2 border-green-500 p-4 rounded">
                                <div className="mt-2 text-green-600">This is the logged in user: {('display_name' in spotify.user ? spotify.user.display_name : spotify.user.name) ?? "(unknown)"}</div>
                                <div>{spotify.user.email ?? "(unknown)"}</div>
                                <div className="max-h-48 overflow-y-auto mt-4">
                                    {isPlaylistLoading && <div>Loading playlists...</div>}
                                    {playlistData?.items.map((playlist) => (
                                        <div key={playlist.id} className="border-b py-2">
                                            {playlist.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <a href="/api/auth/spotify">
                                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Login with Spotify</button>
                                </a>
                            </>
                        )}
                    </section>

                    <section className="mt-6">
                        <h2 className="font-semibold mb-2">YouTube</h2>
                        {youtube.isAuthenticated && youtube.user ? (
                            <div className="border-2 border-green-500 p-4 rounded">
                                <div className="mt-2 text-green-600">This is the logged in user: {('name' in youtube.user ? youtube.user.name : youtube.user.display_name) ?? "(unknown)"}</div>
                                <div>{youtube.user.email ?? "(unknown)"}</div>
                            </div>
                        ) : (
                            <a href="/api/auth/youtube">
                                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Login with YouTube</button>
                            </a>
                        )}
                    </section>
                </div>

            </PageTemplate>
        </div>
    );
}

