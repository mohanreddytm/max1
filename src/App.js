import {Route, Routes} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={LoginRoute} />
    </Routes>
  )
}

export default App
