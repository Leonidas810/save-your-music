import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlatformAuth = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // epoch ms
  userId: string | null;
};

type AuthState = {
  spotify: PlatformAuth;
  youtube: PlatformAuth;
};

const initialPlatform: PlatformAuth = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  userId: null,
};

const initialState: AuthState = {
  spotify: { ...initialPlatform },
  youtube: { ...initialPlatform },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSpotifyAuth(state, action: PayloadAction<Partial<PlatformAuth>>) {
      state.spotify = { ...state.spotify, ...action.payload } as PlatformAuth;
      if (state.spotify.accessToken) state.spotify.isAuthenticated = true;
    },
    clearSpotifyAuth(state) {
      state.spotify = { ...initialPlatform };
    },
    setYoutubeAuth(state, action: PayloadAction<Partial<PlatformAuth>>) {
      state.youtube = { ...state.youtube, ...action.payload } as PlatformAuth;
      if (state.youtube.accessToken) state.youtube.isAuthenticated = true;
    },
    clearYoutubeAuth(state) {
      state.youtube = { ...initialPlatform };
    },
  },
});

export const { setSpotifyAuth, clearSpotifyAuth, setYoutubeAuth, clearYoutubeAuth } = authSlice.actions;

export default authSlice.reducer;
