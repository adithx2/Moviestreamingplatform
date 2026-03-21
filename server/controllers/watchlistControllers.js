const Watchlist = require('../models/Watchlist')

const getWatchlist = async (req, res) => {

    try {

        const userId = req.user.id

        const watchlists = await Watchlist.find({ userId })

        res.status(200).json(watchlists)

    } catch (error) {

        res.status(500).json({ message: "Error fetching watchlists" })

    }

}

const createWatchlist = async (req, res) => {

    try {

        console.log(req.body)
        const { movieId, title, image, genres } = req.body

        const userId = req.user.id

        const exists = await Watchlist.findOne({

            userId,
            movieId
        })

        if (exists) {

            return res.status(400).json({

                message: 'Movie already in watchlist'
            })
        }

        const item = new Watchlist({

            userId,
            movieId,
            title,
            image,
            genres
        })

        console.log(item)

        await item.save()

        res.status(201).json({

            message: "Movie added to watchlist",
        })


    } catch (error) {

        res.status(500).json({ message: err.message })
    }
}

const watchlistID = async (req, res) => {

    try {

        const { id } = req.params

        const watchlist = await Watchlist.findById(id)

        if (!watchlist) {

            return res.status(404).json({

                success: false,
                message: "Watchlist not found"
            })

        }

        res.status(200).json({

            success: true,
            watchlist: watchlist,
            message: "Watchlist fetched successfully"
        })


    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Failed to fetch watchlist",
            error: error.message
        })

    }
}

const deleteWatchlist = async (req, res) => {

    try {

        const { id } = req.params
        const data = await Watchlist.findByIdAndDelete(id)

        if (!data) {

            return res.status(404).json({

                success: false,
                message: "Watchlist not found"
            })
        }

        return res.status(200).json({

            success: false,
            message: "Watchlist delete successfully"
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({

            success: false,
            message: error.message
        })


    }
}

const updateWatchlist = async (req, res) => {

    try {

        const { id } = req.params

        const data = req.body

        const update = await Watchlist.findByIdAndUpdate(
            id, data, {
            new: true,
            runValidators: true
        })

        if (!update) {

            res.status(500).json({

                success: false,
                message: "Watchlist not found"
            })

            return res.status(201).json({

                success: true,
                user: update,
                message: "Watchlist update successfully"
            })
        }

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,
            message: "Failed to update"
        })
    }
}



module.exports = { getWatchlist, createWatchlist, watchlistID, deleteWatchlist, updateWatchlist }