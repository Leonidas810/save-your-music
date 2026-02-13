export type Platform = 'spotify' | 'youtube' | 'unknown';

export interface Track {
    title: string;
    artists: string[];
    durationMs?: number;
    source?: Platform;
    raw?: any;
}

export interface Playlist {
    id: string;
    title: string;
    description?: string;
    tracks?: Track[];
    raw?: any;
}
