import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useMovies } from "../hooks/moviesHook";
import { setLoading,setResetState } from "../reducers/moviesReducer";
import { useRef } from "react";
import { ComponentMovies } from "../components/ComponentMovies";
import "../App.css";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);
  const { GetMovies, handleScroll } = useMovies();
  const movie = useRef(null);

  useEffect(() => {
    searchTerm && dispatch(setLoading(true));
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      dispatch(setResetState())
      GetMovies(debouncedTerm);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header>
        <h1>Buscador de peliculas</h1>
        {/* crear un input para pedir peliculas */}
        <input
          type="text"
          placeholder="Buscar pelicula"
          ref={movie}
          onChange={handleInputChange}
        />
      </header>

      {loading ? (
        <main className="page">
          <p>Loading</p>
        </main>
      ) : (
        <main>
          <ComponentMovies movies={movies} />
        </main>
      )}
    </>
  );
}
