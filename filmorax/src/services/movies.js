import apiClient from "./axiosConfig";

export const getMovies = async () => {
  const res = await apiClient.get("/movies");
  return res.data;
};

export const createMovie = async (movie) => {
  const res = await apiClient.post("/movies", movie);
  return res.data;
};

export const updateMovie = async (id, movie) => {
  const res = await apiClient.put(`/movies/${id}`, movie);
  return res.data;
};

export const deleteMovie = async (id) => {
  const res = await apiClient.delete(`/movies/${id}`);
  return res.data;
};

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
