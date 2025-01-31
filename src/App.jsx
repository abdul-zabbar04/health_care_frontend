import { Outlet } from 'react-router'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'


function App() {
  return (
    <>
    <Navbar></Navbar>
    <main className='justify-center pt-20 min-h-screen'>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App