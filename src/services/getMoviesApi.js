export function getMoviesApi(dataShearch,page) {
  const KEY = import.meta.env.VITE_KEYMOVIES;
  const API =`https://api.themoviedb.org/3/search/movie?&language=es-US&page=${page}&query=${dataShearch}&api_key=`;
  const URLPOSTER = "https://image.tmdb.org/t/p/original";

  return fetch(`${API}${KEY}`)
    .then((response) => response.json())
    .then((data) => {
      let movies = data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          image: `${URLPOSTER}${movie.poster_path}`,
          overview:movie.overview
        };
      });
      return { movies, error: null };
    });
}
