import create from 'zustand';
import { SpotifyPlaylist, SpotifyTrack, SpotifyTracks } from '../types/spotify-types';

interface NoAuthState {
  playlist: SpotifyPlaylist | null;
  setPlaylist: (playlist: NoAuthState['playlist']) => void;

  tracks: SpotifyTracks;
  track: SpotifyTrack | null;
  trackId: string | null;
  previewTrackId: string | null;
  isTrackPlaying: boolean;
  trackProgress: number;
  playingAudio: HTMLAudioElement | null;
  previewAudio: HTMLAudioElement | null;
  fadeIn: ReturnType<typeof setInterval> | null;
  fadeOut: ReturnType<typeof setInterval> | null;

  isMuted: boolean;
  volume: number;
  saveVolume: number;

  setTracks: (tracks: NoAuthState['tracks']) => void;
  setTrack: (track: NoAuthState['track']) => void;
  setTrackId: (trackId: NoAuthState['trackId']) => void;
  setPreviewTrackId: (previewTrackId: NoAuthState['trackId']) => void;
  setIsTrackPlaying: (isTrackPlaying: NoAuthState['isTrackPlaying']) => void;
  setTrackProgress: (trackProgress: NoAuthState['trackProgress']) => void;
  setPlayingAudio: (audio: NoAuthState['playingAudio']) => void;
  setPreviewAudio: (audio: NoAuthState['previewAudio']) => void;
  setFadeIn: (fadeIn: NoAuthState['fadeIn']) => void;
  setFadeOut: (fadeOut: NoAuthState['fadeOut']) => void;
  setIsMuted: (isMuted: NoAuthState['isMuted']) => void;
  setVolume: (volume: NoAuthState['volume']) => void;
  setSaveVolume: (saveVolume: NoAuthState['saveVolume']) => void;
}

export const useNoAuthStore = create<NoAuthState>((set) => ({
  playlist: null,
  setPlaylist: (playlist) => set({ playlist }),

  tracks: [],
  track: null,
  trackId: null,
  previewTrackId: null,
  isTrackPlaying: false,
  trackProgress: 0,
  playingAudio: null,
  previewAudio: null,
  fadeIn: null,
  fadeOut: null,
  isMuted: false,
  volume: 50,
  saveVolume: 50,

  setTracks: (tracks) => set({ tracks }),
  setTrack: (track) => set({ track }),
  setTrackId: (trackId) => set({ trackId }),
  setPreviewTrackId: (previewTrackId) => set({ previewTrackId }),
  setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying }),
  setTrackProgress: (trackProgress) => set({ trackProgress }),
  setPlayingAudio: (playingAudio) => set({ playingAudio }),
  setPreviewAudio: (previewAudio) => set({ previewAudio }),
  setFadeIn: (fadeIn) => set({ fadeIn }),
  setFadeOut: (fadeOut) => set({ fadeOut }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
  setSaveVolume: (saveVolume) => set({ saveVolume }),
}));
