export type SpotifyPlaylist = SpotifyApi.SinglePlaylistResponse;
export type SpotifyPlaylists = SpotifyApi.PlaylistObjectSimplified[];
export type SpotifyTrack = SpotifyApi.TrackObjectFull;
export type SpotifyTracks = SpotifyApi.PlaylistTrackObject[];
export type SpotifyPlaybackState = SpotifyApi.CurrentPlaybackResponse;

declare global {
  namespace SpotifyApi {
    interface TrackObjectFull extends TrackObjectSimplified {
      offset?: number;
    }
  }
}
