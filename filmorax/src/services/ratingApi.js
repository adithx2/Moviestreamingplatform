import apiClient from "./axiosConfig"

export const addRating = async (data) => {
  const response = await apiClient.post("/ratings/rate", data)
  return response.data
}

export const getRatings = async (movieId) => {
  const response = await apiClient.get(`/ratings/${movieId}`)
  return response.data
}