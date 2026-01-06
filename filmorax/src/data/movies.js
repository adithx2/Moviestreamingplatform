import axios from "axios";

// Trending (Stranger Things ONLY - static)

export const fetchTrendingMovies = async () => {

  return [
    {
      id: 1,
      title:"Trending Movies",
      name: "Stranger Things",
      rating: { average: 8.7 },
      content: "When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
      subcontent:"The fifth and final season of the American science fiction horror drama television series Stranger Things, marketed as Stranger Things 5",
      image: {
        original: "https://deadline.com/wp-content/uploads/2025/12/stranger-things-season-5-netflix-posters.jpg?w=1024"
      }
    }
  ];
};

// Recommended (Other popular shows - API)

export const fetchRecommendedMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.tvmaze.com/shows"
    );

    return res.data
      .filter(show => show.image)
      .slice(20, 60);
  } catch (error) {
    console.error("Recommended API error:", error);
    return [];
  }

  
    
};