import { useCallback } from "react";
import {  useDispatch,useStore } from "react-redux";
import { actions } from "../../types/types";
import { setPage } from "../reducers/moviesReducer";


export const useMovies = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const GetMovies = useCallback(async ( movieSearch) => {
    dispatch({
      type: actions.GET_MOVIES,
      payload: {
        movieSearch,
      },
    });
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      const estadoActual = store.getState()
      dispatch(setPage(estadoActual.movies.page+1))
      GetMovies(estadoActual.movies.movieSearch)
    }
  };

  return { GetMovies,handleScroll };
};
