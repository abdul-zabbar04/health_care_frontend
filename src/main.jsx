import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Components/Authentication/Login'
import Signup from './Components/Authentication/SignUp'
import Home from './pages/home/Home.jsx'
import Error from './pages/error/Error.jsx'
import StepsGuide from './Components/StepGuide/StepsGuide.jsx'
import Doctors_view from './Components/Doctors_views/Doctors_view.jsx'
import About from './pages/about_us/About.jsx'
import Contact from './pages/contact_us/Contact.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Profile from './pages/dashboard/Profile.jsx'
import Logout from './Components/Authentication/Logout.jsx'
import PatientSignup from './Components/Authentication/PatientSignup.jsx'
import DoctorSignup from './Components/Authentication/DoctorSignup.jsx'
import DoctorDetails from './pages/doctor_details/DoctorDetails.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
        <Route path="/" element={<Home></Home>} />
        <Route path="/guide" element={<StepsGuide></StepsGuide>} />
        <Route path="/find-doctor" element={<Doctors_view></Doctors_view>} />
        <Route path="/doctor/:id" element={<DoctorDetails></DoctorDetails>} />
        <Route path="/about-us" element={<About></About>} />
        <Route path="/contact-us" element={<Contact></Contact>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path='/view-profile' element={<Profile></Profile>}/>
        <Route path='/patient-register' element={<PatientSignup/>}/>
        <Route path='/doctor-register' element={<DoctorSignup></DoctorSignup>}/>
        <Route path="*" element={<Error></Error>} />
      </Route>
      {/* Authentication routes */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/logout" element={<Logout></Logout>} />
    </Routes>
  </BrowserRouter>,
);

