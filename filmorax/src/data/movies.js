import axios from "axios";

export const fetchTrendingMovies = async () => {

  return [
    {
      id: 1,
      title: "Trending Movies",
      name: "Stranger Things",
      rating: { average: 8.7 },
      premiered: "2025",
      story:"When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
      content: "The fifth and final season of the American science fiction horror drama television series Stranger Things, marketed as Stranger Things 5, was released on the streaming service Netflix in two volumes and the finale. The first set of four episodes was released on November 26, 2025, the second set of three episodes was released on December 25, while the finale was released on December 31. It was produced by the show's creators, the Duffer Brothers, along with Shawn Levy and Dan Cohen.The season stars Winona Ryder, David Harbour, Millie Bobby Brown, Finn Wolfhard, Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink, Natalia Dyer, Charlie Heaton, Joe Keery, Maya Hawke, Brett Gelman, Priah Ferguson, Linda Hamilton, Cara Buono, Jamie Campbell Bower, and Nell Fisher. Joe Chrest, Sherman Augustus, Alex Breaux, Jake Connelly, Amybeth McNulty, Randy Havens, and Linnea Berthelsen appear in recurring roles. The season received positive reviews from critics.",
      image: {
        original: "https://deadline.com/wp-content/uploads/2025/12/stranger-things-season-5-netflix-posters.jpg?w=1024"
      }
    }
  ];
};


export const fetchRecommendedMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.tvmaze.com/shows"
    );

    return res.data
      .filter(show => show.image)
      .slice(10, 88);
  } catch (error) {
    console.error("Recommended API error:", error);
    return [];
  }



};