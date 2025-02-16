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
import DoctorDetails from './pages/doctor_details/DoctorDetails.jsx'
import Appointment from './Components/Appointment/Appointment.jsx'
import DoctorSignup from './Components/Authentication/DoctorSignup.jsx'
import Checkout from './pages/checkout/Checkout.jsx'
import SuccessPayment from './pages/checkout/SuccessPayment.jsx'
import FailedPayment from './pages/checkout/FailedPayment.jsx'
import PasswordChange from './Components/Authentication/PasswordChange.jsx'
import PasswordResetRequest from './Components/Authentication/PasswordResetRequest.jsx'
import ReviewForm from './pages/doctor_details/ReviewForm.jsx'
import DoctorReviews from './pages/doctor_details/DoctorReviews.jsx'
import PasswordResetConfirm from './Components/Authentication/PasswordResetConfirm.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
        <Route path="/" element={<Home></Home>} />
        <Route path="/guide" element={<StepsGuide></StepsGuide>} />
        <Route path="/find-doctor" element={<Doctors_view></Doctors_view>} />
        <Route path="/doctor/:id" element={<DoctorDetails></DoctorDetails>} />
        <Route path="/appointment/:id" element={<Appointment></Appointment>} />
        <Route path="/about-us" element={<About></About>} />
        <Route path="/contact-us" element={<Contact></Contact>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path='/view-profile' element={<Profile></Profile>}/>
        <Route path='/patient-register' element={<PatientSignup/>}/>
        <Route path='/doctor-register' element={<DoctorSignup></DoctorSignup>}/>
        <Route path='/password/change' element={<PasswordChange></PasswordChange>}/>
        <Route path='/review/create/:doctor/:patient' element={<ReviewForm></ReviewForm>}/>
        <Route path='/reviews/:doctor' element={<DoctorReviews></DoctorReviews>}/>
        <Route path="*" element={<Error></Error>} />
      </Route>
      {/* Authentication routes */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/password/reset" element={<PasswordResetRequest></PasswordResetRequest>} />
      <Route path="password/reset/:uid/:token" element={<PasswordResetConfirm></PasswordResetConfirm>} />
      <Route path="/logout" element={<Logout></Logout>} />
      {/* payment routes */}
      <Route path="/checkout/:id" element={<Checkout></Checkout>}/>
      <Route path="/payment-success/:id" element={<SuccessPayment/>} />
      <Route path="/payment-fail/" element={<FailedPayment/>} />
    </Routes>
  </BrowserRouter>,
);

