import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
const RootLayout = () => {
  return (

    <>

      <Navbar />

      <Outlet />

      <Footer/>

    </>

  )
}

export default RootLayout