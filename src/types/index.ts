export type Platform = 'spotify' | 'youtube' | 'unknown';

export interface PaginateResponse<T> {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    next?: string;
    previous?: string;
}
export interface Track {
    title: string;
    artists: string[];
    durationMs?: number;
    source?: Platform;
}

export interface Playlist {
    id: string;
    name: string;
    description?: string;
    tracks?: Track[];
    images?: { url: string; width: number; height: number }[];
}
