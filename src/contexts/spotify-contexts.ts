import create from 'zustand';
import SpotifyWebApi from 'spotify-web-api-node';
import {
  SpotifyPlaybackState,
  SpotifyPlaylist,
  SpotifyPlaylists,
  SpotifyTrack,
} from '../types/spotify-types';

interface PlaylistState {
  playlists: SpotifyPlaylists;
  playlist: SpotifyPlaylist | null;
  playlistId: string | null;

  setPlaylists: (playlists: PlaylistState['playlists']) => void;
  setPlaylist: (playlist: PlaylistState['playlist']) => void;
  setPlaylistId: (playlistId: PlaylistState['playlistId']) => void;

  getPlaylists: (spotifyApi: SpotifyWebApi) => Promise<PlaylistState['playlists']>;
  getPlaylist: (
    spotifyApi: SpotifyWebApi,
    playlistId: string,
  ) => Promise<PlaylistState['playlist']>;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  playlist: null,
  playlistId: null,

  setPlaylists: (playlists) => set({ playlists }),
  setPlaylist: (playlist) => set({ playlist }),
  setPlaylistId: (playlistId) => set({ playlistId }),

  getPlaylists: async (spotifyApi) => {
    const playlists = await spotifyApi.getUserPlaylists().then((data) => {
      return data.body.items;
    });
    return playlists;
  },

  getPlaylist: async (spotifyApi, playlistId) => {
    const playlist = await spotifyApi.getPlaylist(playlistId).then((data) => {
      return data.body;
    });
    return playlist;
  },
}));

interface TrackState {
  track: SpotifyTrack | null;
  playbackState: SpotifyPlaybackState | null;
  trackId: string | null;
  previewTrackId: string | null;
  isTrackPlaying: boolean;
  trackProgress: number;
  audio: HTMLAudioElement | null;
  fadeIn: ReturnType<typeof setInterval> | null;
  fadeOut: ReturnType<typeof setInterval> | null;

  setTrack: (track: TrackState['track']) => void;
  setTrackId: (trackId: TrackState['trackId']) => void;
  setPreviewTrackId: (previewTrackId: TrackState['trackId']) => void;
  setIsTrackPlaying: (isTrackPlaying: TrackState['isTrackPlaying']) => void;
  setTrackProgress: (trackProgress: TrackState['trackProgress']) => void;
  setAudio: (audio: TrackState['audio']) => void;
  setFadeIn: (fadeIn: TrackState['fadeIn']) => void;
  setFadeOut: (fadeOut: TrackState['fadeOut']) => void;

  getPlaybackState: (spotifyApi: SpotifyWebApi) => Promise<TrackState['playbackState']>;
}

export const useTrackStore = create<TrackState>((set) => ({
  track: null,
  playbackState: null,
  trackId: null,
  previewTrackId: null,
  isTrackPlaying: false,
  trackProgress: 0,
  audio: null,
  fadeIn: null,
  fadeOut: null,

  setTrack: (track) => set({ track }),
  setTrackId: (trackId) => set({ trackId }),
  setPreviewTrackId: (previewTrackId) => set({ previewTrackId }),
  setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying }),
  setTrackProgress: (trackProgress) => set({ trackProgress }),
  setAudio: (audio) => set({ audio }),
  setFadeIn: (fadeIn) => set({ fadeIn }),
  setFadeOut: (fadeOut) => set({ fadeOut }),

  getPlaybackState: async (spotifyApi) => {
    const playbackState = spotifyApi.getMyCurrentPlaybackState().then((data) => {
      return data.body;
    });
    return playbackState;
  },
}));
