const express = require('express')
const { validateToken, admin } = require('../middileware/authMiddileware')
const userRoutes = express.Router()

const { getUsers, createUsers, login, checkUser, userID, deleteUser, logout, updateUser , forgotPassword , resetPassword} = require('../controllers/authController')

userRoutes.get('/', validateToken , admin, getUsers)

userRoutes.post('/register', createUsers)

userRoutes.post('/login', login)

userRoutes.post('/forgot-password', forgotPassword)

userRoutes.post('/reset-password/:token', resetPassword)

userRoutes.get('/checkUser', validateToken, checkUser)

userRoutes.get('/:id', admin , userID)

userRoutes.post('/logout', logout)

userRoutes.delete('/:id', deleteUser)

userRoutes.put('/:id', updateUser)

module.exports = userRoutes

