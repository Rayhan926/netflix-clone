import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState, useCallback } from "react";
import YouTube from "react-youtube";
import Loader, { FailedTrailer } from "../components/Loader";
import Nav from "../components/Nav";
import useMovies from "../hooks/useMovies";
import useTrailer from "../hooks/useTrailer";
import { image_base_path, youtubePlayerOptions } from "../utils/requests";
import { movieName } from "./../utils/functions";
import { getCustomOptions } from "./../utils/requests";

function SingleGenre({ genre }) {
  const router = useRouter();
  const title = router.query.title;

  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, movies, hasmore } = useMovies(genre, pageNumber);

  const [movieTrailer, setMovieTrailer] = useState("");
  const { loadingTrailer, failedTrailer, trailerId, movieId } =
    useTrailer(movieTrailer);

  const observer = useRef();
  const lastMovieElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasmore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasmore]
  );

  const handleClick = (movie) => {
    if (movie.id === movieId) {
      setMovieTrailer("");
    } else {
      setMovieTrailer(movie);
    }
  };

  return (
    <>
      {failedTrailer && <FailedTrailer />}
      <Nav className="bg_black" />
      <div className="single_netflix_genre_wrapper">
        <h1>{title}</h1>
      </div>
      <div className="container">
        <div className="movies_grid_wrapper">
          {movies.map((movie, index) => {
            if (movies.length === index + 1) {
              return (
                <div
                  className={`movie_wrapper ${
                    movieId === movie.id && "playing_trailer"
                  }`}
                  ref={lastMovieElement}
                  key={movie.id}
                >
                  <Image
                    className="imgLoading"
                    src={image_base_path + movie.poster_path}
                    alt="sas"
                    width={250 * 2}
                    height={250 * 3}
                  />
                  <div className="overly_content">
                    <p className="title">{movieName(movie)}</p>
                    <p>{movie.overview}</p>
                    <div className="buttons_group">
                      <span
                        className="play_trailer_btn"
                        onClick={() => handleClick(movie)}
                      >
                        {loadingTrailer && <Loader />}
                        {trailerId ? "Close" : "Trailer"}
                      </span>
                      <span className="play_trailer_btn">Details</span>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={`movie_wrapper ${
                    movieId === movie.id && "playing_trailer"
                  }`}
                  key={movie.id}
                >
                  <Image
                    className="imgLoading"
                    src={image_base_path + movie.poster_path}
                    alt="sas"
                    width={250 * 2}
                    height={250 * 3}
                  />
                  <div className="overly_content">
                    <p className="title">{movieName(movie)}</p>
                    <p>{movie.overview}</p>
                    <div className="buttons_group">
                      <span
                        className="play_trailer_btn"
                        onClick={() => handleClick(movie)}
                      >
                        {loadingTrailer && <Loader />}
                        {trailerId ? "Close" : "Trailer"}
                      </span>
                      <span
                        className="play_trailer_btn"
                        onClick={() => {
                          router.push({
                            pathname: "/details/[movieId]",
                            query: { movieId: movie.id },
                          });
                        }}
                      >
                        Details
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {loading && !error && (
          <div className="loading_more_wrapper">
            <Loader extraClassName="single_page_loader" />
          </div>
        )}
        {error && (
          <div className="loading_more_wrapper with_error">
            <h4>Something went wrong!</h4>
          </div>
        )}
      </div>
      {trailerId && (
        <div className="youtube_trailer_wrapper trailer_popup_wrapper singleGenrePlayerWrapper">
          <XIcon
            className="close_trailer_icon singleGenreClose"
            onClick={() => setMovieTrailer("")}
          />

          <YouTube
            videoId={trailerId}
            opts={{
              playerVars: {
                autoplay: 1,
              },
            }}
            onEnd={() => setMovieTrailer("")}
          />
        </div>
      )}
    </>
  );
}

SingleGenre.getInitialProps = async ({ query }) => {
  const { genre } = query;
  return { genre };
};

export default SingleGenre;
