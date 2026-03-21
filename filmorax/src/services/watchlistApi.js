import apiClient from "./axiosConfig";

export const getWatchlist = async () => {

    const response = await apiClient.get('/watchlist')
    return response.data
}

export const createWatchlist = async (movie) => {

    const response = await apiClient.post('/watchlist', movie)
    return response.data
}

export const watchlistID = async (id) => {

    const resposne = await apiClient.get(`/watchlist/${id}`)
    return resposne.data
}

export const deleteWatchlist = async (id) => {

    const response = await apiClient.delete(`/watchlist/${id}`)
    return response.data
}

export const updateWatchlist = async (id, movie) => {

    const response = await apiClient.put(`/watchlist/${id}`, movie)
    return response.data
}