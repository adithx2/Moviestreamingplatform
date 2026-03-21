import apiClient from "./axiosConfig";

export const fetchTrendingMovies = async () => {
  const res = await apiClient.get(`/movies/trending`);
  return res.data;
};

export const fetchRecommendedMovies = async () => {
  const res = await apiClient.get("/movies/recommended");
  return res.data;
};

export const getRecommendationAI = async () => {
  const res = await apiClient.get("/movies/ai");
  console.log(res.data)
  return res.data;
};

export const getMovieId = async (id) => {

  const res = await apiClient.get(`/movies/${id}`)
  return res.data
}