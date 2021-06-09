export const movieName = (movie) => {
  return (
    movie.name || movie.original_name || movie.title || movie.original_title
  );
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};
