import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './pages/context/AuthContext';
import { useContext } from 'react';

function App() {

  // const {currentUser}=authContext
  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />
  //   }
  //   return children
  // }

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/home' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Routes>


    </div>
  );
}

export default App;
