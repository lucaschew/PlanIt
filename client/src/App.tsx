import React from 'react'
import AppRoutes from './routes'
import './styles/index.css'
import axios from 'axios'

export default function App() {
  axios.defaults.withCredentials = true
  return <AppRoutes />
}
