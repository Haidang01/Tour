import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';
import Layout from './pages/Layout';
import DoashBoard from './pages/DoashBoard';
import SingleTour from './pages/SingleTour';
function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
  }, [])
  return (
    <div className='app'>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route path="/home" element={<Home />} />
            <Route path="/doashboard" element={<DoashBoard />} />
            <Route path="/addTour" element={<AddEditTour />} />
            <Route path="/editTour:id" element={<AddEditTour />} />
            <Route path="/getTour/:id" element={<SingleTour />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
