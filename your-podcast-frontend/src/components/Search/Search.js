import { Button, Container, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPodcast } from '../../actions/podcast';
import Podcast from '../Podcast/Podcast';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [podcasts, setPodcasts] = useState([]);

  const { filteredPodcasts, error } = useSelector((state) => state.podcast);

  console.log(filteredPodcasts?.podcasts);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearErrors' });
    }
    if (filteredPodcasts) {
      setPodcasts(filteredPodcasts);
    }
    dispatch(getPodcast(keyword, category));
  }, [dispatch, keyword, category, error, filteredPodcasts]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container style={{ margin: '0' }}>
      {/* <Stack direction={'row'}> */}
      <Stack direction={'column'}>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderBottom: '1px solid #ccc',
            }}
            placeholder="Search a Podcast ..."
            onChange={(e) => setCategory(e.target.value)}
          />
        </form>
        {/* {podcasts.map((podcast, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Podcast completePodcast={podcast} />
          </Grid>
        ))}
        {podcasts.length === 0 && (
          <h1 style={{ textAlign: 'center' }}>No Podcasts Found</h1>
        )} */}
      </Stack>
      {/* </Stack> */}
    </Container>
  );
};

export default Search;
