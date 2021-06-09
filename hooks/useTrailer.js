import movieTrailer from "movie-trailer";
import { useEffect, useState } from "react";
import { movieName } from "../utils/functions";

function useTrailer(movie) {
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [failedTrailer, setFailedTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    if (!movie) {
      setFailedTrailer(false);
      setLoadingTrailer(false);
      setTrailerId("");
      setMovieId(null);
    } else {
      setLoadingTrailer(true);
      setFailedTrailer(false);
      movieTrailer(movieName(movie))
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setLoadingTrailer(false);
          setMovieId(movie.id);
          setTrailerId(urlParams.get("v"));
        })
        .catch((err) => {
          setMovieId(null);
          setFailedTrailer(true);
          setLoadingTrailer(false);

          setTimeout(() => {
            setFailedTrailer(false);
          }, 3000);
        });
    }
  }, [movie]);
  return { loadingTrailer, failedTrailer, trailerId, movieId };
}

export default useTrailer;
