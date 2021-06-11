import useMovies from "../hooks/useMovies";
import { movieName, truncate } from "../utils/functions";
import { image_base_path } from "../utils/requests";
import Loader, { Loading } from "./Loader";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header({ genre }) {
  const { movies, loading, error } = useMovies(genre, 1);
  let randomMovie = movies[Math.floor(Math.random() * movies.length - 1)];
  const [bgForDevice, setBgForDevice] = useState(true);
  const [device, setDevice] = useState({});

  useEffect(() => {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    setDevice({
      width: windowWidth,
      height: windowHeight,
    });
    if (windowHeight > windowWidth) {
      setBgForDevice(false);
    } else {
      setBgForDevice(true);
    }
  }, []);

  let bgDevicePoster;
  if (!loading) {
    bgDevicePoster = bgForDevice
      ? image_base_path + randomMovie.backdrop_path
      : image_base_path + randomMovie.poster_path;
  }
  return (
    <>
      <header className="netflix_header" style={{ height: device.height }}>
        {!loading && (
          <img
            src={bgDevicePoster}
            className="header_poster_image"
            alt="Header Poster"
          />
        )}
        <div className="header_content_wrapper">
          <div className="container header_container">
            {!error ? (
              <>
                <h1 className="movie_title">
                  {loading ? (
                    <Loading styling={{ height: "50px", width: "500px" }} />
                  ) : (
                    movieName(randomMovie)
                  )}
                </h1>
                <div className="movie_overview">
                  {loading ? (
                    <>
                      <Loading
                        styling={{
                          width: "450px",
                          height: "15px",
                          marginBottom: "4px",
                        }}
                      />
                      <Loading
                        styling={{
                          width: "410px",
                          height: "15px",
                          marginBottom: "4px",
                        }}
                      />
                      <Loading styling={{ width: "380px", height: "15px" }} />
                    </>
                  ) : (
                    <p>{truncate(randomMovie.overview, 150)}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="loading_more_wrapper with_error">
                <h4>Something went wrong!</h4>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
