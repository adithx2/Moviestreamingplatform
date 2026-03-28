const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors')

const userRoutes = require('./routers/authRoute')
const cookieParser = require('cookie-parser')
const movieRoutes = require('./routers/movieRoute')
const ratingRoutes = require('./routers/ratingRoute')
const watchlistRouter = require('./routers/watchlistRoute')
connectDB()
const app = express()

app.use(cookieParser())
app.use(express.json())

// const frontend_url = process.env.FRONTEND_URL


// app.use(cors({

//     origin: frontend_url,
//     credentials: true

// }))


const allowedOrigins = [
  "http://localhost:5173",
  "https://moviestreamingplatform-lps9.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use('/users', userRoutes)

app.use('/watchlist', watchlistRouter)

app.use('/ratings', ratingRoutes)

app.use('/movies', movieRoutes)


app.get('/', (req, res) => {

  res.send("Hello world")
})


const port = process.env.PORT || 5000
app.listen(port, () => {

  console.log('Server started succesfully')
})