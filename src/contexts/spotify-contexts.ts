import create from 'zustand';
import SpotifyWebApi from 'spotify-web-api-node';
import { SpotifyPlaylist, SpotifyPlaylists, SpotifyTrack } from '../types/spotify';

interface PlaylistState {
  playlists: SpotifyPlaylists;
  playlist: SpotifyPlaylist | null;
  playlistId: string;

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
  playlistId: '13WYhzJvxrVuFtIFW2J45o',

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
      set({ playlistId: playlistId });
      return data.body;
    });
    return playlist;
  },
}));

interface TrackState {
  track: SpotifyTrack | null;
  trackId: string | null;
  previewTrackId: string | null;
  isTrackPlaying: boolean;
  audio: HTMLAudioElement | null;
  fadeIn: ReturnType<typeof setInterval> | null;
  fadeOut: ReturnType<typeof setInterval> | null;

  setTrack: (track: TrackState['track']) => void;
  setTrackId: (trackId: TrackState['trackId']) => void;
  setPreviewTrackId: (previewTrackId: TrackState['trackId']) => void;
  setIsTrackPlaying: (isTrackPlaying: TrackState['isTrackPlaying']) => void;
  setAudio: (audio: TrackState['audio']) => void;
  setFadeIn: (fadeIn: TrackState['fadeIn']) => void;
  setFadeOut: (fadeOut: TrackState['fadeOut']) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  track: null,
  trackId: null,
  previewTrackId: null,
  isTrackPlaying: false,
  audio: null,
  fadeIn: null,
  fadeOut: null,

  setTrack: (track) => set({ track }),
  setTrackId: (trackId) => set({ trackId }),
  setPreviewTrackId: (previewTrackId) => set({ previewTrackId }),
  setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying }),
  setAudio: (audio) => set({ audio }),
  setFadeIn: (fadeIn) => set({ fadeIn }),
  setFadeOut: (fadeOut) => set({ fadeOut }),
}));
