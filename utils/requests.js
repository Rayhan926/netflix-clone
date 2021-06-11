// const API_KEY = process.env.API_KEY;
const API_KEY = "fba2c0e57517fd5376acd6cc9f52f05e";

const requests = {
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  mystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  western: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  animation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  tv: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  documentries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
export const movie_details_path = (movieId) =>
  `${api_base_path}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

export const image_base_path = "https://image.tmdb.org/t/p/original";
export const api_base_path = "https://api.themoviedb.org/3";
export const youtubePlayerOptions = {
  height: "300",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};
export default requests;
