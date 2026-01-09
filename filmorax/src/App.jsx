import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Tvshows from './pages/Tvshows'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import Search from './components/Search'
import RootLayout from './layout/Rootlayout'
import Landing from './pages/Landing'
import Login from './components/Login'
import Logout from './components/Logout'
import Footer from './pages/Footer'


const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route element={<RootLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search/>}/>
            <Route path='watchlist' element={<Watchlist />} />
            <Route path='movies' element={<Movies/>}/>
            <Route path='tvshows' element={<Tvshows />} />
            <Route path='moviedetails/:id' element={<MovieDetails />} />
          </Route>

        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App