import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Tvshows from './pages/Tvshows'
import MovieDetails from './pages/MovieDetails'
  

const App = () => {
  return (
    <div>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='watchlist' element={<Watchlist/>}/>
        <Route path='tvshows' element={<Tvshows/>}/>
        <Route path='moviedetails' element={<MovieDetails/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App