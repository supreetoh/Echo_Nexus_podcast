import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './pages/signup/Signup.js';
import Login from './pages/login/Login.js';
import Home from './pages/Home/Home';
import NotFound from './pages/Not Found/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/user';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';

function App() {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    dispatch({ type: 'clearError' });
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Router>
      {isAuthenticated && <Navbar user={user} />}
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/search"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/favourites"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route exact path="/home/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
