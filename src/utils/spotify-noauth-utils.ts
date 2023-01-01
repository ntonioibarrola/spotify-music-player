import { SpotifyPlaylist, SpotifyTracks } from '../types/spotify-types';

export const getAccessToken = async (): Promise<string> => {
  const authorization = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID ?? ''}:${process.env.SPOTIFY_CLIENT_SECRET ?? ''}`,
  ).toString('base64');

  const grant = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const { access_token } = (await grant.json()) as { access_token: string };

  return access_token;
};

export const getNoAuthPlaylist = async (
  id: string,
): Promise<{ playlist: SpotifyPlaylist; tracks: SpotifyTracks }> => {
  const accessToken = await getAccessToken();

  const tracksRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${0}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  let tracks = await tracksRequest.json();

  const totalBatches = Math.floor(tracks.total / 100) + 1;
  let allTracks: SpotifyTracks = [];

  for (let i = 0; i < totalBatches; i++) {
    let nextTrackBatch = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${i * 100}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    let { items } = (await nextTrackBatch.json()) as {
      items: SpotifyTracks;
    };

    allTracks = allTracks.concat(items);
  }

  allTracks = allTracks.filter((item) => item.track && item.track.preview_url);
  allTracks = allTracks.map((items, index) => ({
    ...items,
    track: { ...items.track, offset: index },
  })) as SpotifyTracks;

  const playlistRequest = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let playlist = (await playlistRequest.json()) as SpotifyPlaylist;
  playlist.tracks.items = allTracks;

  return {
    playlist: playlist,
    tracks: allTracks,
  };
};
