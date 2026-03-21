const express = require('express')
const  validateToken  = require('../middileware/authMiddileware')
const userRoutes = express.Router()

const { getUsers, createUsers, login, checkUser, userID, deleteUser, logout , updateUser } = require('../controllers/authController')

userRoutes.get('/', getUsers)

userRoutes.post('/register', createUsers)

userRoutes.post('/login', login)

userRoutes.get('/checkUser', validateToken, checkUser)

userRoutes.get('/:id', userID)

userRoutes.post('/logout', logout)

userRoutes.delete('/:id', deleteUser)

userRoutes.put('/:id', updateUser)

module.exports = userRoutes

