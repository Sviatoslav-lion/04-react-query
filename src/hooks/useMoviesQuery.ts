// src/hooks/useMoviesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";

export function useMoviesQuery(query: string, page: number) {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: !!query, // запит виконується лише коли є текст пошуку
    keepPreviousData: true,
  });
}
