import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register';
import EventManagement from './Components/Event management/index';
import EventBooking from './Components/Event Booking';
import './App.css'
import Home from './Components/Home/Home';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
const App = () => {
  return (
    <div className='main-app'>
      <Router history = {history}>
      <Routes>
          <Route path="/" index element={< Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin-event-management" element={<EventManagement />} />
          <Route path="/customer-event-management" element={<EventBooking />} />
          <Route path="/home" element = {<Home/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </Router>
    <NotificationContainer />
    </div>
  )
}

export default App
