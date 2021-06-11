import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { movieName } from "../../utils/functions";
import { image_base_path } from "../../utils/requests";
function MovieDetails({ data }) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (data.success === false) setError(true);
  }, [data]);
  return (
    <>
      {!error ? (
        <>
          <Nav className="bg_black" />
          <div
            className="movie_details_wrapper"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url(${image_base_path + data.backdrop_path})`,
            }}
          >
            <div className="container">
              <div className="flex_wrapper">
                <div className="poster_img">
                  <img
                    src={image_base_path + data.poster_path}
                    className="imgLoading"
                  />
                </div>
                <div className="movie_details_box">
                  <h1 className="movie_title">{movieName(data)}</h1>
                  <div className="genres_box">
                    <span>Drama,</span>
                    <span>Crime,</span>
                    <span>Mystery </span>
                  </div>
                  <div className="users_vote_box">
                    <h3 className="user_vote_title">Users Vote</h3>
                    <div className="users_vote_progress_box">
                      <div
                        className="vote_progress"
                        style={{ width: data.vote_average * 10 + "%" }}
                      >
                        {data.vote_average * 10 + "%"}
                      </div>
                    </div>
                    <h3 className="vote_count">
                      Total vote: {data.vote_count}
                    </h3>
                  </div>
                  <div className="details_movie_overview">
                    <h3>Overview</h3>
                    <p>{data.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error_popup">
          <h1>Couldn't load the data.</h1>
          <Link href="/">
            <a>Go Home</a>
          </Link>
        </div>
      )}
    </>
  );
}

export default MovieDetails;

export async function getServerSideProps(context) {
  const movieId = context.query.movieId;

  let data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=fba2c0e57517fd5376acd6cc9f52f05e&language=en-US`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
