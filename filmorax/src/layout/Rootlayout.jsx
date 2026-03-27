import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
const RootLayout = () => {
  return (

    <>

    <div className='flex flex-col min-h-screen bg-black text-white'>
      <Navbar />

      <div className='flex-1'>
      <Outlet />
      </div>


      <Footer />

      </div>

    </>

  )
}

export default RootLayout

