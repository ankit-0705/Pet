import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import RegisterPage from './routes/register';
import HomePage from "./routes/home";
import ProfilePage from './routes/profile';
import PetState from './context/petState'

function App() {

  return (
    <>
      <PetState>
        <Router>
          <Routes>
            <Route path='/' element={<RegisterPage/>} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
          </Routes>
        </Router>
      </PetState>
    </>
  )
}

export default App
