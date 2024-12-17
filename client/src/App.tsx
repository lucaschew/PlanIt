import React from 'react'
import AppRoutes from './routes'
import './styles/index.css'
import axios from 'axios'

export default function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'https://mcgill-planit.onrender.com'
  return <AppRoutes />
}
