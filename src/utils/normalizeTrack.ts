import { Track } from '../types';

export function normalizeTrackFromYouTube(item: any): Track {
    return {
        title: item?.snippet?.title || 'Unknown title',
        artists: item?.snippet?.videoOwnerChannelTitle ? [item.snippet.videoOwnerChannelTitle] : [],
        durationMs: undefined,
        source: 'youtube',
        raw: item,
    } as Track;
}

export function normalizeTrackFromSpotify(item: any): Track {
    return {
        title: item?.name || 'Unknown title',
        artists: (item?.artists || []).map((a: any) => a.name),
        durationMs: item?.duration_ms,
        source: 'spotify',
        raw: item,
    } as Track;
}
