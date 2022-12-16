import create from 'zustand';
import SpotifyWebApi from 'spotify-web-api-node';

interface PlaylistState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  playlist: SpotifyApi.SinglePlaylistResponse | null;
  playlistId: string;

  setPlaylists: (playlists: PlaylistState['playlists']) => void;
  setPlaylist: (playlist: PlaylistState['playlist']) => void;
  setPlaylistId: (playlistId: PlaylistState['playlistId']) => void;

  getPlaylistContexts: (spotifyApi: SpotifyWebApi, playlistId: string) => Promise<void>;
  getPlaylist: (spotifyApi: SpotifyWebApi, playlistId: string) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),

  playlist: null,
  setPlaylist: (playlist) => set({ playlist }),

  playlistId: '13WYhzJvxrVuFtIFW2J45o',
  setPlaylistId: (playlistId) => set({ playlistId }),

  getPlaylistContexts: async (spotifyApi, playlistId) => {
    spotifyApi.getUserPlaylists().then((data) => {
      set({ playlists: data.body.items });
    });

    spotifyApi.getPlaylist(playlistId).then((data) => {
      set({ playlist: data.body });
    });
  },

  getPlaylist: async (spotifyApi, playlistId) => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      set({ playlist: data.body });
      set({ playlistId: playlistId });
    });
  },
}));

interface TrackState {
  activeTrackId: string;
  setActiveTrack: (trackId: TrackState['activeTrackId']) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  activeTrackId: '',
  setActiveTrack: (activeTrackId) => set({ activeTrackId }),
}));
