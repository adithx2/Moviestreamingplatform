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
import Profile from './components/Profile'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Admin from './components/Admin'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <div>

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Landing />} />

          <Route element={<RootLayout />}>

            <Route path='/signup' element={<SignUp />} />

            <Route path='/login' element={

              <Login />

            } />

            <Route path='/home' element={

              <ProtectedRoute>

                <Home />

              </ProtectedRoute>

            } />


            <Route path='/admin' element={

              <ProtectedRoute>

                <Admin />

              </ProtectedRoute>

            } />

            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path='/search' element={

              <ProtectedRoute>
                <Search />

              </ProtectedRoute>
            } />
            <Route path='/watchlist' element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } />
            <Route path='/movies' element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } />
            <Route path='/tvshows' element={
              <ProtectedRoute>
                <Tvshows />
              </ProtectedRoute>
            } />
            <Route path='/moviedetails/:id' element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } />
          </Route>

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App