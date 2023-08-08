import React from 'react';
import { Container, Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainScreen from '../MainScreen/MainScreen.js';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useLocation } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Favourite from '../../components/Favourites/Favourite';

const Home = () => {
  const loading = false;
  const location = useLocation();

  let content;

  if (location.pathname === '/') {
    content = <MainScreen />;
  } else if (location.pathname === '/search') {
    content = <Search />;
  } else if (location.pathname === '/favourites') {
    content = <Favourite />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container style={{ margin: '0', padding: '0' }}>
          <Stack direction={'row'}>
            <Sidebar />
            <Stack direction={'column'}>{content}</Stack>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Home;
