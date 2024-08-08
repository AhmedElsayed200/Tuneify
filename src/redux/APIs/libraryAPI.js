import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.example.com',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer YOUR_TOKEN_HERE');
    return headers;
  },
});

export const musicAPI = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    getPosts: builder.query({
      query: () => 'posts',
    }),
    getComments: builder.query({
      query: () => 'comments',
    }),
  }),
});

export const { useGetMuQuery } = musicAPI;
