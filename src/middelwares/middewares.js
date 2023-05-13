import { setMovies,setLoading,setMovieSearch } from "../reducers/moviesReducer";
import { getMoviesApi } from "../services/getMoviesApi";
import { actions } from "../../types/types";


export const customMiddleware = (store) => (next) => async (action) => {
    // console.log("<<<Dispatching>>> action:", action,store);
    const state = store.getState();

    if (action.type === actions.GET_MOVIES) {

      const {movieSearch} = action.payload
      const data = await getMoviesApi(movieSearch,state.movies.page)
      store.dispatch(setMovieSearch(movieSearch))
      store.dispatch(setMovies(data.movies));
      store.dispatch(setLoading(false));

    }
  
    return next(action);
  };
  