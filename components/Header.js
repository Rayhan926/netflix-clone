import { useEffect, useState } from "react";
import { movieName, truncate } from "../utils/functions";
import { api_base_path, image_base_path } from "../utils/requests";

function Header({ fetchUrl }) {
  const [randomMovie, setRandomMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(api_base_path + fetchUrl).then((res) =>
        res.json()
      );
      setRandomMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return data;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <>
      <header
        className="netflix_header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${
            image_base_path + randomMovie?.backdrop_path
          })`,
        }}
      >
        <div className="container">
          <div className="header_content_wrapper">
            <h1 className="movie_title">{movieName(randomMovie)}</h1>
            <div className="movie_buttons">
              <a href="#">Play</a>
              <a href="#">Trailer</a>
            </div>
            <p className="movie_overview">
              {truncate(randomMovie.overview, 400)}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
