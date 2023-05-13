import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovieSelect } from "../reducers/moviesReducer";
import { PopupWindow } from "./PopupWindow";

export const ComponentMovies = () => {
  const { movies, movieSelected } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const selectMovie = (movie) => {
    const scrollPosition = window.pageYOffset;
    localStorage.setItem('scrollPosition', scrollPosition);    
    dispatch(setMovieSelect(movie));
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem('scrollPosition');
    }
  }, []);

  // useEffect(() => {
  //   const targetElementShow = document.querySelectorAll(".target");
  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("active");
  //       } else {  
  //         entry.target.classList.remove("active");
  //       }
  //     })

  //   })

  //   targetElementShow.forEach((contacto) => {
  //     observer.observe(contacto);
  //   });

  // }, [movies]);

  return (
    <ul className="movies ">
      {movies.map((movie) => {
        return (
          <li key={movie.id} className={`movie target active`}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <a href={movie.image} className="progressive replace logo" onClick={() => selectMovie(movie)}>
              <img
                src={movie.image}
                className="preview "
                alt={movie.title}
                loading="lazy"
              />
            </a>

            {/* <img
              src={movie.image}
              alt={movie.title}
              className={`logo`}
              onClick={() => selectMovie(movie)}
              loading="lazy"
            /> */}
          </li>
        );
      })}

      {movieSelected && <PopupWindow />}
    </ul>
  );
};
