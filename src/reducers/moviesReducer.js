import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: false,
  page: 1,
  movieSelected: null,
  movieSearch: null,
};

//crear un slice
export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMovieSelect: (state, action) => {
      state.movieSelected = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setMovieSearch: (state, action) => {
        state.movieSearch = action.payload;
    },
    setResetState: (state) => {
        console.log(111)
        Object.assign(state, initialState);
    },

  },
});

//exportar el slice
export const { setMovies, setLoading, setMovieSelect, setPage,setMovieSearch ,setResetState} =
  moviesSlice.actions;

//exportar el reducer
export default moviesSlice.reducer;
