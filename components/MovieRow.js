import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  XIcon,
} from "@heroicons/react/outline";
import SwiperCore, { Navigation } from "swiper";
import Image from "next/image";
import { movieName } from "../utils/functions";
import YouTube from "react-youtube";
import Loader, { FailedTrailer } from "./Loader";
import { useRouter } from "next/router";
import { image_base_path, youtubePlayerOptions } from "../utils/requests";
import useMovies from "../hooks/useMovies";
import useTrailer from "../hooks/useTrailer";
import Link from "next/link";

SwiperCore.use([Navigation]);

function MovieRow({ title, isVerticalPoster, genre }) {
  const router = useRouter();

  const [movieTrailer, setMovieTrailer] = useState("");
  const { loadingTrailer, failedTrailer, trailerId, movieId } =
    useTrailer(movieTrailer);

  const { movies, otherData, loading, error } = useMovies(genre, 1);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
      <div className="movie_row_wraper">
        <div className="container">
          <h3 className="title">{title}</h3>

          {loading && !error && (
            <div className="loading_more_wrapper">
              <Loader extraClassName="single_page_loader" />
            </div>
          )}

          {!error ? (
            <div className="movies_slider_wrapper">
              <Swiper
                spaceBetween={10}
                slidesPerView={isVerticalPoster ? 8 : 6}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                breakpoints={{
                  0: {
                    slidesPerView: isVerticalPoster ? 1 : 1,
                  },
                  300: {
                    slidesPerView: isVerticalPoster ? 1.2 : 1.2,
                  },
                  480: {
                    slidesPerView: isVerticalPoster ? 2 : 2,
                  },
                  550: {
                    slidesPerView: isVerticalPoster ? 3 : 3,
                  },
                  750: {
                    slidesPerView: isVerticalPoster ? 4 : 4,
                  },
                  950: {
                    slidesPerView: isVerticalPoster ? 6 : 5,
                  },
                  1200: {
                    slidesPerView: isVerticalPoster ? 7 : 5,
                  },
                }}
              >
                <div className="swiper_custom_navigation_wrapper">
                  <div ref={prevRef} className="navigation">
                    <ChevronLeftIcon />
                  </div>
                  <div ref={nextRef} className="navigation">
                    <ChevronRightIcon />
                  </div>
                </div>

                {movies && !loading && !error && (
                  <SwiperSlide className="movie_wrapper view_all_slide">
                    <Image
                      className="imgLoading"
                      src={`${
                        isVerticalPoster
                          ? "/img/hide_vertical.jpg"
                          : "/img/hide_horizontal.jpg"
                      }`}
                      alt={
                        isVerticalPoster
                          ? "vertical_sd4565"
                          : "horizonal_45fasd"
                      }
                      width={isVerticalPoster ? 400 : 600}
                      height={isVerticalPoster ? 600 : 340}
                    />
                    <a onClick={() => router.push(`/${genre}?title=${title}`)}>
                      <PlayIcon className="view_more_icon" />
                      <span>
                        View {otherData.total_results - movies.length} more
                      </span>
                    </a>
                  </SwiperSlide>
                )}

                {movies?.map((movie) => {
                  let poster = isVerticalPoster
                    ? movie.poster_path
                    : movie.backdrop_path;

                  poster = poster
                    ? image_base_path + poster
                    : "/img/placeholder.jpg";

                  return (
                    <SwiperSlide
                      className={`movie_wrapper ${
                        movieId == movie.id ? "playing_trailer" : ""
                      }`}
                      key={movie.id}
                    >
                      <Image
                        className="imgLoading"
                        src={poster}
                        alt={movieName(movie)}
                        width={isVerticalPoster ? 400 : 600}
                        height={isVerticalPoster ? 600 : 340}
                      />
                      <div className="overly_content">
                        <p className="title">{movieName(movie)}</p>
                        <p>{movie.overview}</p>

                        <div className="buttons_group">
                          <Link href="#">
                            <a>
                              <span
                                className="play_trailer_btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleClick(movie);
                                }}
                              >
                                {loadingTrailer && <Loader />}
                                {movieId == movie.id ? "Close" : "Trailer"}
                              </span>
                            </a>
                          </Link>
                          <Link
                            href="/details/[movieId]"
                            as={`/details/${movie.id}`}
                          >
                            <a>
                              <span className="play_trailer_btn">Details</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <div className="loading_more_wrapper with_error">
              <h4>Something went wrong!</h4>
            </div>
          )}
        </div>
        {trailerId && (
          <div className="container">
            <div className="youtube_trailer_wrapper">
              <XIcon
                className="close_trailer_icon"
                onClick={() => setMovieTrailer("")}
              />
              <YouTube
                videoId={trailerId}
                opts={youtubePlayerOptions}
                onEnd={() => setMovieTrailer("")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieRow;
