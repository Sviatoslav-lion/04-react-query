// src/components/MovieModal/MovieModal.tsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/movieService';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') ?? document.body;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);

    // disable body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        {movie.backdrop_path ? (
          <img
            src={getImageUrl(movie.backdrop_path, 'original') ?? undefined}
            alt={movie.title}
            className={css.image}
          />
        ) : null}
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;
