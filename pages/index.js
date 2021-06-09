import Header from "../components/Header";
import MovieRow from "../components/MovieRow";
import Nav from "../components/Nav";
import requests from "../utils/requests";
export default function Home() {
  return (
    <>
      <Nav />
      <Header fetchUrl={requests.netflixOriginals} />
      <MovieRow
        title="NETFLIX ORIGINALS"
        isVerticalPoster
        genre="netflixOriginals"
      />
      <MovieRow title="Trending Now" genre="trending" />
      {/* <MovieRow title="Top Rated" genre="topRated" />
      <MovieRow title="Action" genre="action" />
      <MovieRow title="Comedy" genre="comedy" />
      <MovieRow title="Horror" genre="horror" />
      <MovieRow title="Romance" genre="romance" />
      <MovieRow title="Mystery" genre="mystery" />
      <MovieRow title="Documentries" genre="documentries" />
      <MovieRow title="Western" genre="western" /> */}
      <MovieRow title="Animation" genre="animation" />
      <MovieRow title="TV" genre="tv" />
    </>
  );
}

// https://api.themoviedb.org/3
