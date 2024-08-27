import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://shazam-core7.p.rapidapi.com/',
  prepareHeaders: (headers) => {
    headers.set(
      'x-rapidapi-key',
      '40ca9f7e1dmshefd3d504cb757a5p14eb18jsnad569e926574'
    );
    headers.set('x-rapidapi-host', 'shazam-core7.p.rapidapi.com');
    return headers;
  },
});

const endpoints = (builder) => ({
  getSongsByGenre: builder.query({
    query: (id) => `songs/list-recommendations?id=${id}&limit=20`,
  }),
  getSongInfo: builder.query({
    query: (id) => `songs/get_details?id=${id}`,
  }),
  getRelatedSongs: builder.query({
    query: (id) => `songs/list-recommendations?id=${id}&limit=20`,
  }),
  getArtistDetails: builder.query({
    query: (id) => `artist/get-details?id=${id}`,
  }),
  getArtistSongs: builder.query({
    query: (id) => `artist/get-top-songs?id=${id}&offset=0`,
  }),
});

export const musicAPI = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints,
});

export const {
  useGetSongsByGenreQuery,
  useGetSongInfoQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
} = musicAPI;
