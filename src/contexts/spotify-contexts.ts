import create from 'zustand';
import SpotifyWebApi from 'spotify-web-api-node';

interface PlaylistState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  playlist: string | null;
  playlistId: string;

  setPlaylists: (spotifyApi: SpotifyWebApi) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  setPlaylists: async (spotifyApi) => {
    spotifyApi.getUserPlaylists().then((data) => {
      set({ playlists: data.body.items });
    });
  },

  playlist: null,
  setPlaylist: (playlist: PlaylistState['playlist']) => set({ playlist }),

  playlistId: '13WYhzJvxrVuFtIFW2J45o',
  setPlaylistId: (playlistId: PlaylistState['playlistId']) => set({ playlistId }),
}));
