import { Box, Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { loadUser, logOut } from '../../actions/user';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch({ type: 'clearError' });
  }, [error]);

  const logout = async () => {
    console.log('logout');
    try {
      await dispatch(logOut());
    } catch {
      toast.error('Error logging out');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ minHeight: '100vh' }}
      bgcolor={'#181818'}
    >
      <Stack
        flexGrow={1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '16px',
        }}
      >
        {/* <h1 style={{ color: '#fff', marginBottom: '32px' }}>YOUR PODCAST</h1> */}
        <Link to="/">
          <Button
            style={{
              margin: '4px',
              color: '#fff',
              borderColor: '#fff',
              textAlign: 'left',
            }}
            variant="text"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        </Link>
        <Link to="/search">
          <Button
            style={{
              margin: '4px',
              color: '#fff',
              borderColor: '#fff',
              textAlign: 'left',
            }}
            variant="text"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Link>
        <Link to="/favourites">
          <Button
            style={{
              margin: '4px',
              color: '#fff',
              borderColor: '#fff',
              textAlign: 'left',
            }}
            variant="text"
            startIcon={<FavoriteIcon />}
          >
            Favourites
          </Button>
        </Link>
      </Stack>
      <Box
        style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}
      >
        <Button
          style={{
            // margin: 'auto',
            marginBottom: '5px',
            backgroundColor: '#fff',
            color: '#181818',
          }}
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
