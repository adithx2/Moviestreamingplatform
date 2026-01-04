import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Tvshows from './pages/Tvshows'
import MovieDetails from './pages/MovieDetails'
import RootLayout from './layout/Rootlayout'
import Landing from './pages/Landing'
import Footer from './pages/Footer'


const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route element={<RootLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='watchlist' element={<Watchlist />} />
            <Route path='tvshows' element={<Tvshows />} />
            <Route path='moviedetails' element={<MovieDetails />} />
          </Route>
        </Routes>

        {/* <Footer/> */}
      </BrowserRouter>

    </div>
  )
}

export default App