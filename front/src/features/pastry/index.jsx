import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const uri = 'http://localhost:3001'

export const pastryApi = createApi({
    reducerPath: 'pastryApi',
    baseQuery: fetchBaseQuery({ baseUrl: uri, credentials:'include' }), 
    endpoints: (builder) => ({
      getPastries: builder.query({
        query: () => `game/pastries`,
      }),
      getWinPastries: builder.query({
        query: (quantity) => `game/win-pastries/${quantity}`,
      }),
      getPastryFromId: builder.query({
        query: (id) => `game/pastrie/${id}`,
      }),
      getRefresh: builder.query({
        query: () => `game/refresh`,
      }),
      //AUTHENTICATION
      login: builder.mutation({
        query: (credentials) => ({
          url: 'login',
          method: 'POST',
          body: credentials
        }),
      }),
      // logout: builder.query({
      //   query: () => `logout`,
      // }),
      logout: builder.mutation({
        query: () => ({
            url: `logout`,
            method: 'GET', // or POST if that's what your backend requires
        }),
      }),
      // CRUD
      createPastry: builder.mutation({
        query: (credentials) => ({
          url: 'api/pastry',
          method: 'POST',
          body: credentials
        }),
      }),
      deletePastry: builder.mutation({
        query: (id) => ({
          url: `api/pastry/${id}`,
          method: 'DELETE',
        }),
      }),
      // ME
      getUsers: builder.query({
        query: () => `users`,
      }),
      getMe: builder.query({
        query: () => `me`,
      }),

    }),
  })

  export const { useGetPastriesQuery, useGetWinPastriesQuery, useGetPastryFromIdQuery, useGetRefreshQuery, 
    useLoginMutation, useDeletePastryMutation, useCreatePastryMutation, useLogoutQuery,
  useGetUsersQuery, useGetMeQuery, useLogoutMutation } = pastryApi

  