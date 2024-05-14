import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const uri = 'http://localhost:3001'

export const pastryApi = createApi({
    reducerPath: 'pastryApi',
    baseQuery: fetchBaseQuery({ baseUrl: uri }),
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
      logout: builder.query({
        query: () => `logout`,
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
    }),
  })

  export const { useGetPastriesQuery, useGetWinPastriesQuery, useGetPastryFromIdQuery, useGetRefreshQuery, 
    useLoginMutation, useDeletePastryMutation, useCreatePastryMutation, useLogoutQuery } = pastryApi

  