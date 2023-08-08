import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Podcast from '../../components/Podcast/Podcast';
import { useDispatch, useSelector } from 'react-redux';
import { getPodcasts, trendingPodcasts } from '../../actions/podcast';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, trending, podcasts } = useSelector((state) => state.podcast);

  useEffect(() => {
    dispatch(trendingPodcasts());
    dispatch(getPodcasts());
  }, []);

  return (
    <Container>
      <Grid container direction={'column'}>
        <h1>Top Trending</h1>
        <Grid
          container
          item
          direction={'row'}
          style={{ padding: '20px', maxWidth: '100%' }}
          spacing={2}
        >
          {trending !== undefined &&
            trending.slice(0, 4).map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Podcast completePodcast={item} />
                </Grid>
              );
            })}
        </Grid>
        <h1>All Podcasts</h1>
        <Grid
          container
          item
          direction={'row'}
          style={{ padding: '20px', maxWidth: '100%' }}
          spacing={2}
          sx={{ overflowX: 'auto' }}
        >
          {trending !== undefined &&
            trending.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Podcast completePodcast={item} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
