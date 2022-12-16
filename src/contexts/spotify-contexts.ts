import create from 'zustand';
import SpotifyWebApi from 'spotify-web-api-node';
import { SpotifyPlaylist, SpotifyPlaylists } from '../types/spotify';

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
  audio: HTMLAudioElement | null;
  fadeIn: ReturnType<typeof setInterval> | null;
  fadeOut: ReturnType<typeof setInterval> | null;
  trackId: string | null;

  setAudio: (audio: TrackState['audio']) => void;
  setFadeIn: (fadeIn: TrackState['fadeIn']) => void;
  setFadeOut: (fadeOut: TrackState['fadeOut']) => void;
  setTrackId: (trackId: TrackState['trackId']) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  audio: null,
  fadeIn: null,
  fadeOut: null,
  trackId: null,

  setAudio: (audio) => set({ audio }),
  setFadeIn: (fadeIn) => set({ fadeIn }),
  setFadeOut: (fadeOut) => set({ fadeOut }),
  setTrackId: (trackId) => set({ trackId }),
}));
