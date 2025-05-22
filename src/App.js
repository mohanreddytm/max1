import {Route, Routes} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'

import Home from './components/Home'


import './App.css'

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={LoginRoute} />
      <Route exact path="/" Component={Home} />
    </Routes>
  )
}

export default App
