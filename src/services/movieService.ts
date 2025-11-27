// src/services/movieService.ts
import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const token = import.meta.env.VITE_TMDB_TOKEN as string;

if (!token) {
  console.warn('VITE_TMDB_TOKEN is not set. Requests will fail without a token.');
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

interface TmdbSearchResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export async function fetchMovies(params: FetchMoviesParams): Promise<TmdbSearchResponse> {
  const config = {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  const { data } = await axios.get<TmdbSearchResponse>(
    `${BASE_URL}/search/movie`,
    config
  );

  return data;
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
