import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setMovieSelect } from "../reducers/moviesReducer";

export const PopupWindow = () => {
  const dispatch = useDispatch();
  const { movieSelected } = useSelector((state) => state.movies);

  const closePopup = () => {
    dispatch(setMovieSelect(null));
  };

  return (
    <div className="popup" onClick={closePopup}>
      <div className="popup-content">
        <h3>{movieSelected.title}</h3>
        <p>{movieSelected.overview}</p>
        <p>{movieSelected.releaseYear}</p>
        <Link to={`/movie/${movieSelected.title}`}>
          <button>Ver mas</button>
        </Link>
      </div>
    </div>
  );
};
