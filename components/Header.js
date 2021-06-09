import useMovies from "../hooks/useMovies";
import { movieName, truncate } from "../utils/functions";
import { image_base_path } from "../utils/requests";
import { Loading } from "./Loader";

function Header({ genre }) {
  const { movies, loading, error } = useMovies(genre, 1);
  let randomMovie = movies[Math.floor(Math.random() * movies.length - 1)];
  return (
    <>
      <header
        className="netflix_header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${
            !loading && image_base_path + randomMovie.backdrop_path
          })`,
        }}
      >
        <div className="container">
          <div className="header_content_wrapper">
            <h1 className="movie_title">
              {loading ? (
                <Loading styling={{ height: "50px", width: "500px" }} />
              ) : (
                movieName(randomMovie)
              )}
            </h1>
            <div className="movie_buttons">
              {loading ? (
                <>
                  <Loading
                    styling={{
                      width: "95px",
                      height: "35px",
                      marginRight: "12px",
                    }}
                  />
                  <Loading
                    styling={{
                      width: "90px",
                      height: "35px",
                    }}
                  />
                </>
              ) : (
                <>
                  <a href="#">Play</a>
                  <a href="#">Trailer</a>
                </>
              )}
            </div>
            <p className="movie_overview">
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
                truncate(randomMovie.overview, 400)
              )}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
