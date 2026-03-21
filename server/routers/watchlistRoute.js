const express = require('express')
const watchlistRouter = express.Router()
const { getWatchlist, createWatchlist, watchlistID, deleteWatchlist, updateWatchlist } = require('../controllers/watchlistControllers')
const validateToken = require('../middileware/authMiddileware')

watchlistRouter.get('/', validateToken, getWatchlist)

watchlistRouter.post('/', validateToken, createWatchlist)

watchlistRouter.get('/:id', validateToken, watchlistID)

watchlistRouter.delete('/:id', validateToken, deleteWatchlist)

watchlistRouter.put('/:id', validateToken, updateWatchlist)

module.exports = watchlistRouter


