// src/components/App/App.tsx
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    // очистити колекцію перед новим пошуком
    setMovies([]);
    setError(null);

    if (!query.trim()) {
      // SearchBar вже показує toast при порожньому — дублювання тут не потрібне,
      // але додамо на всякий випадок:
      toast.error('Please enter your search query.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchMovies({ query });
      if (!data.results || data.results.length === 0) {
        toast('No movies found for your request.');
        setMovies([]);
        setLoading(false);
        return;
      }
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      setError('There was an error, please try again...');
      toast.error('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
