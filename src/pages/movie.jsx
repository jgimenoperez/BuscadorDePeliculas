import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Movie = () => {
  const { movies } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState({});

  const { id } = useParams();

  useEffect(() => {
    //filtrar el contenido de movies por id
    setMovie(...movies.filter((movie) => movie.title === id));
  }, []);

  return (
    <div className="pagemovie">
      <div >
        <div >
          <Link to={`/`}>
            <button>Volver</button>
          </Link>
        </div>
        <ul className="movies">
          <li className="movie">
            <img
              src={movie.image}
              alt={movie.title}
              className="logo"
              style={{ width: "100%" }}
            />
          </li>
          <li className="movie">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        </ul>
      </div>
    </div>

  );
};
