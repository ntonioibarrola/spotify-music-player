export const getPlaylistDuration = (items: SpotifyApi.PlaylistTrackObject[]) => {
  const sumSongDurations = items.reduce(
    (accumulator, item) => accumulator + item?.track!.duration_ms,
    0,
  );

  const minutes = Math.floor((sumSongDurations / 1000 / 60) % 60);
  const hours = Math.floor((sumSongDurations / 1000 / 60 / 60) % 24);

  return `${hours} hr ${String(minutes).padStart(2, '0')} min`;
};

export const getSongArtists = (artists: SpotifyApi.ArtistObjectSimplified[] | undefined) => {
  return artists?.map((artist) => artist.name).join(', ');
};

export const getSongDuration = (timeInMilliseconds: number | undefined) => {
  if (!timeInMilliseconds) return;

  const songDuration = new Date(timeInMilliseconds);
  return `${songDuration.getMinutes()}:${String(songDuration.getSeconds()).padStart(2, '0')}`;
};

export const getAddedByDate = (isoDateString: string) => {
  const addedByDate = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return addedByDate.toLocaleDateString('en-US', options);
};
