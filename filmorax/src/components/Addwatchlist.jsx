import React from 'react'
import { toast } from 'react-toastify';
import { createWatchlist } from '../services/watchlistApi';

export const AddWatchlist = async (movie) => {

    try {

        const movieData = {

            movieId: movie.id,
            title: movie.name,
            genre: movie.genre,
            image: movie.image?.medium ||  movie.image?.original

        };

        console.log(movieData)
        await createWatchlist(movieData);

        toast.success("Added to Watchlist");

    } catch (error) {

        console.log(error);

        toast.error("Already in Watchlist");

    }

};