import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Podcast.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { updatePodcastViews } from '../../actions/podcast';
import { addPodcastToFavorite } from '../../actions/user';
import { toast } from 'react-hot-toast';

const Podcast = ({ completePodcast }) => {
  const [open, setOpen] = useState(false);

  const { error, message } = useSelector((state) => state.podcast);

  useEffect(() => {
    if (error) {
      toast.success(error);
    }
    dispatch({ type: 'clearError' });
  }, [error, message]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePodcastViews(completePodcast._id));
  }, [dispatch]);

  const addToFavourite = async () => {
    try {
      await dispatch(addPodcastToFavorite(completePodcast._id));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Box
        className="podcast-box"
        onClick={handleOpen}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          boxShadow: 24,
        }}
        style={{
          backgroundColor: '#292929',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <div className="box-container">
          <Typography variant="h5">By: {completePodcast.name}</Typography>
          <Typography variant="body1">
            Category: {completePodcast.category}
          </Typography>
          <Typography variant="body1">
            Speaker: {completePodcast.speaker}
          </Typography>
          <Typography variant="body1">{completePodcast.views}</Typography>
          <Typography variant="body1">{completePodcast.type}</Typography>
        </div>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5">{completePodcast.name}</Typography>
          <Typography variant="body1">By {completePodcast.speaker}</Typography>
          <video
            autoPlay
            style={{ width: '100%', height: 'auto' }}
            controls
            controlsList="nodownload noremoteplayback nofullscreen"
            disablePictureInPicture
            disableRemotePlayback
            src={completePodcast.file.url}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '16px',
            }}
          >
            <Button
              variant="outlined"
              style={{
                marginBottom: '5px',
                backgroundColor: '#fff',
                color: '#000',
              }}
              startIcon={<FavoriteIcon />}
              onClick={addToFavourite}
            >
              Add to Favourites
            </Button>
          </div>
          <Typography variant="body1" style={{ marginTop: '16px' }}>
            {completePodcast.description}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Podcast;
