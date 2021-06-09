import axios from "axios";
import { useState, useEffect } from "react";
import requests, { api_base_path } from "../utils/requests";

export default function useMovies(genre, pageNumber) {
  const fetchUrl = `${api_base_path + requests[genre]}&page=${pageNumber || 1}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [otherData, setOtherData] = useState({});
  const [hasmore, setHasmore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(fetchUrl)
      .then((res) => {
        setMovies((prevMovies) => {
          return [...prevMovies, ...res.data.results];
        });
        setOtherData({
          page: res.data.page,
          total_pages: res.data.total_pages,
          total_results: res.data.total_results,
        });
        setHasmore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [genre, pageNumber]);
  return { loading, error, movies, hasmore, otherData };
}
