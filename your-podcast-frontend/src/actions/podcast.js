import axios from 'axios';

const server = 'http://localhost:5000/api/v1/podcast';
//const server = 'https://your-podcast-api.onrender.com/api/v1/podcast';

export const uploadPodcast = (myForm) => async (dispatch) => {
  console.log(myForm);
  try {
    dispatch({ type: 'UPLOAD_PODCAST_REQUEST' });
    const { data } = await axios.post(`${server}/upload`, myForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({ type: 'UPLOAD_PODCAST_SUCCESS', payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: 'UPLOAD_PODCAST_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getPodcasts = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_PODCASTS_REQUEST' });
    const { data } = await axios.get(`${server}/getEveryPodcasts`);
    dispatch({ type: 'GET_PODCASTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'GET_PODCASTS_FAIL',
      payload: error.response,
    });
  }
};

export const trendingPodcasts = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_TRENDING_PODCASTS_REQUEST' });
    const { data } = await axios.get(`${server}/trending`);
    dispatch({ type: 'GET_TRENDING_PODCASTS_SUCCESS', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'GET_TRENDING_PODCASTS_FAIL',
      payload: error.response,
    });
  }
};

export const updatePodcastViews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_VIEWS_REQUEST' });
    const { data } = await axios.put(`${server}/updatePodcastViews/${id}`);
    dispatch({ type: 'UPDATE_VIEWS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_VIEWS_FAIL',
      payload: error.response,
    });
  }
};

export const getPodcast =
  (keyword = '', category) =>
  async (dispatch) => {
    console.log(keyword, category);
    try {
      dispatch({ type: 'GET_PODCAST_REQUEST' });
      let link = `${server}/getPodcasts?keyword=${keyword}`;
      if (category) {
        link = `${server}/getPodcasts?keyword=${keyword}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: 'GET_PODCAST_SUCCESS',
        payload: data,
      });
      console.log(data.podcasts);
    } catch (error) {
      dispatch({
        type: 'GET_PODCAST_FAIL',
        payload: error.response,
      });
    }
  };
