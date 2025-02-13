import { Outlet } from 'react-router'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import "./index.css"; 
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar></Navbar>
    <main className='justify-center pt-20 min-h-screen'>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App