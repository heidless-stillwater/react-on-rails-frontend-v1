import { useState } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from './components/NavBar'


import './App.css'

import AppRoutes from './components/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app">
        <h1>Rails Blog</h1>
        <p>Application Info Here</p>
        < NavBar />
        < AppRoutes />
      </div>
    </Router>
  )
}

export default App
