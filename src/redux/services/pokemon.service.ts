import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_CACHE_TAGS } from "../../lib/constants";

const { POKEMON } = API_CACHE_TAGS;

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/pokemon`,
  }),
  tagTypes: [POKEMON],
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ pageNum, perPage }) =>
        `?limit=${perPage}&offset=${perPage * pageNum}`,
      transformResponse: (response: any) => response.results,
      providesTags: [POKEMON],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
