const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcrypt')

// users data

const getUsers = async (req, res) => {

    try {

        const users = await User.find()

        res.status(200).json(users)

    } catch (error) {

        res.status(500).json({ message: "Error fetching users" })
    }
}

// signup

const createUsers = async (req, res) => {

    try {

        const { name, email, password, role } = req.body

        const saltRounds = 10

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" })
        }


        bcrypt.hash(password, saltRounds, async (err, hash) => {

            if (err) {

                res.status(500).json({ error: err.message })
            }
            var userItems = {

                name: name,
                email: email,
                password: hash,
                role: role
            }

            const user = new User(userItems)
            await user.save()
            res.status(201).json({ user: user, message: "User created" })
        })


    } catch (error) {

        res.status(500).json({ message: error.message })


    }
}

// userID

const userID = async (req, res) => {

    try {

        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"
            })

        }

        res.status(200).json({

            success: true,
            user: user,
            message: "User fetched successfully"
        })


    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Failed to fetch user",
            error: error.message
        })

    }
}

// delete

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params
        const data = await User.findByIdAndDelete(id)

        if (!data) {

            return res.status(404).json({

                success: false,
                message: "User not found"
            })
        }

        return res.status(404).json({

            success: false,
            message: "User delete successfully"
        })

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,
            message: "Failed to update"
        })


    }
}

// update

const updateUser = async (req, res) => {

    try {

        const { id } = req.params

        const data = req.body

        const update = await User.findByIdAndUpdate(
            id, data, {
            new: true,
            runValidators: true
        })

        if (!update) {

            res.status(500).json({

                success: false,
                message: "User not found"
            })

        }

        return res.status(201).json({

            success: true,
            user: update,
            message: "User update successfully"
        })


    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,
            message: "Failed to update"
        })
    }
}

// login

const login = async (req, res) => {

    try {

        if (!req.body) {

            return res.status(404).json({ error: "Login details cannot be emty" })
        }

        const { email, password } = req.body

        if ((!email) || (!password)) {

            return res.status(400).json({

                error: "Email password are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(404).json({

                message: "User not found"
            })
        }

        // Passsword validation

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {

            return res.status(404).json({

                message: "Invalid password"
            })
        }

        let payload = { id: user._id, name: user.name, email: user.email, role: user.role }

        const token = generateToken(payload)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })

        res.status(200).json({

            message: "Login successfull",
            token: token,
            user: payload
        })

    } catch (error) {

        console.log("Error details:", error)
        res.status(500).json({

            error: error.message
        })
    }
}


const checkUser = async (req, res) => {

    res.status(200).json({ message: "User validate", user: req.user })
}

const logout = (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error: error.message });
    }
};



module.exports = { getUsers, createUsers, userID, checkUser, deleteUser, login, logout, updateUser }