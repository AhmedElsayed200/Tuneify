import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://shazam-core7.p.rapidapi.com/charts/',
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
    query: (genre) => `get-top-songs-in_world_by_genre?genre=${genre}&limit=50`,
  }),
  getPosts: builder.query({
    query: () => 'posts',
  }),
  getComments: builder.query({
    query: () => 'comments',
  }),
});

export const musicAPI = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints,
});

export const { useGetSongsByGenreQuery } = musicAPI;
