import axios from "axios";
import { fetchRecommendedMovies, fetchTrendingMovies } from "../services/movies";


export const trendingMovies = async () => {

  try {

    const res = await fetchTrendingMovies()

    return res;

  } catch (error) {

    console.error("Trending API error:", error)
    return [];

  }

};

export const recommendedMovies = async () => {

  try {

    const res = await fetchRecommendedMovies()

    return res;


  } catch (error) {
    console.error("Recommended API error:", error);
    return [];
  }



};