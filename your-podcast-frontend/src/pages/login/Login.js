import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login } from '../../actions/user';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const { isAuthenticated, error: authError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Logged in successfully');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      // setError(authError);
      toast.error(authError);
    }
    dispatch({ type: 'clearError' });
    dispatch({ type: 'clearMessage' });
  }, [authError, dispatch]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ email, password }));
      setEmail('');
      setPassword('');
      // setError('');
    } catch (error) {
      toast.error(error.response);
    }
  };

  return (
    <section>
      <div className="container__login">
        <div className="sub_container__login">
          <h2>Welcome Back</h2>
          <Toaster />
          <form id="form__login" className="form__login" onSubmit={onSubmit}>
            <input
              type="email"
              className="input__login"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="input__login"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />

            {/* {error && <div className="error">{error}</div>} */}

            <button className="btn" type="submit">
              Login
            </button>
          </form>

          <div className="bottom-text">
            Not registered yet?
            <Link to="/signup">
              <button className="btn-secondary">Register Now</button>
            </Link>{' '}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
