import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Podcast from '../Podcast/Podcast';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFavoritePodcasts } from '../../actions/user';

const Favourite = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyFavoritePodcasts());
  }, []);

  const { favoritePodcasts } = useSelector((state) => state.user);

  return (
    <Grid container direction={'column'}>
      <h1>Favourites</h1>
      <Grid
        container
        item
        direction={'row'}
        style={{ padding: '20px', maxWidth: '100%' }}
        spacing={2}
      >
        {favoritePodcasts !== undefined &&
          favoritePodcasts.slice(0, 4).map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Podcast completePodcast={item} />
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Favourite;
