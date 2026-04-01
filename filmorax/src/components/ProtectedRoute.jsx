import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUser } from '../services/usersApi'

const ProtectedRoute = ({ children, admin = false }) => {

    const [isAuthentication, setAuthentication] = useState(null)
    const Navigate = useNavigate()


    useEffect(() => {

        verifyUser()

    }, [])

    async function verifyUser() {

        try {

            const response = await checkUser()

            // Access cookies

            setAuthentication(true)

            console.log(response)

        } catch (error) {

            console.log(error)
            setAuthentication(false)
            Navigate('/login')
        }
    }

    if (isAuthentication === null) {
        return null

    }

    if (isAuthentication === false) {

        return null

    }

    return children

}

export default ProtectedRoute
