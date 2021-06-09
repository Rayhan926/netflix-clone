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
import {
  getBeakPoints,
  image_base_path,
  youtubePlayerOptions,
} from "../utils/requests";
import useMovies from "../hooks/useMovies";
import useTrailer from "../hooks/useTrailer";

SwiperCore.use([Navigation]);

function MovieRow({ title, fetchUrl, isVerticalPoster, genre }) {
  const router = useRouter();

  const [movieTrailer, setMovieTrailer] = useState("");
  const { loadingTrailer, failedTrailer, trailerId, movieId } =
    useTrailer(movieTrailer);

  const { movies, otherData } = useMovies(genre, 1);

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
                  slidesPerView: isVerticalPoster ? 8 : 6,
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
                      src={poster}
                      alt={movieName(movie)}
                      width={isVerticalPoster ? 400 : 600}
                      height={isVerticalPoster ? 600 : 340}
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
                          {movieId == movie.id ? "Close" : "Trailer"}
                        </span>
                        <span className="play_trailer_btn">Detils</span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

              {movies && (
                <SwiperSlide className="movie_wrapper view_all_slide">
                  <Image
                    src={`${
                      isVerticalPoster
                        ? "/img/hide_vertical.jpg"
                        : "/img/hide_horizontal.jpg"
                    }`}
                    alt="cstm"
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
            </Swiper>
          </div>
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
