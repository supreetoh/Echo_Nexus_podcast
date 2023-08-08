import React, { useEffect, useState } from 'react';
import image from '../../assets/Logoticles-0.1s-1280px.svg';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { loadUser, register } from '../../actions/user';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      toast.error(authError);
    }
    dispatch({ type: 'clearError' });
    dispatch({ type: 'clearMessage' });
  }, [authError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(register({ name, email, password }));
      setEmail('');
      setName('');
      setPassword('');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <img className="music" src={image} alt="Logo" />

      <div className="container__signup">
        <h2>SIGN UP</h2>
        <h3>Podcast for all</h3>
        <Toaster />
        <form className="form__signup" onSubmit={handleSubmit}>
          <div className="textbox__signup">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
            <span class="material-symbols-outlined">account_circle</span>
          </div>
          <div className="textbox__signup">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <span className="material-symbols-outlined">email</span>
          </div>
          <div className="textbox__signup">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span className="material-symbols-outlined">lock</span>
          </div>
          <span className="bottom__text__signup">
            <Link to="/login">
              <button className="btn__secondary__signup">
                Already a user? Login Now
              </button>
            </Link>{' '}
          </span>
          <button type="submit" className="submit__btn__signup">
            Join The Tune
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
