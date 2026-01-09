import React from 'react'

export const Addwatchlist = (movie) => {

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.find((item) => item.id === movie.id);

    if (!exists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Added to Watchlist");
    } else {
        alert("Already in Watchlist");
    }
}

