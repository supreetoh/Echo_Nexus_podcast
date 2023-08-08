import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import tuneIn from '../../assets/tuneIn.jpg';

const Navbar = ({ user }) => {
  const location = useLocation();
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <nav className="container__navbar">
      <div className="navbar__left">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={tuneIn}
            alt="logo"
            style={{
              width: '100%',
              objectFit: 'contain',
              overflow: 'hidden',
            }}
          />
        </Link>
      </div>
      <div className="navbar__right">
        {user?.role === 'admin' && path !== '/home/dashboard' && (
          <Link
            to="/home/dashboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              disableElevation
              // startIcon={<ManageSearchRounded />}
              variant="outlined"
              style={{
                textTransform: 'none',
                marginRight: '0.5rem',
              }}
            >
              <h3>Dashboard</h3>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
