// src/components/MovieGrid/MovieGrid.tsx
import React from 'react';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/movieService';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(movie)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(movie);
            }}
          >
            <img
              className={css.image}
              src={getImageUrl(movie.poster_path, 'w500') ?? undefined}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
