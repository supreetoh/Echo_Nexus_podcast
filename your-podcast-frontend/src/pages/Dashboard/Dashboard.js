import React, { useEffect, useState } from 'react';
import tuneIn from '../../assets/tuneIn.jpg';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPodcast } from '../../actions/podcast';
import { Toaster, toast } from 'react-hot-toast';
import { LinearProgress, Typography } from '@mui/material';

export default function Dashboard() {
  const { loading, error, podcast } = useSelector((state) => state.podcast);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    speaker: '',
    file: null,
  });

  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (podcast) {
      toast.success('Podcast Uploaded Successfully');
      setProgress(0);
    }
    if (error) {
      toast.error(error);
    }
    dispatch({ type: 'clearError' });
    dispatch({ type: 'clearMessage' });
  }, [podcast, dispatch, error]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.speaker ||
      !formData.file
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    try {
      dispatch(uploadPodcast(formData));
      setFormData({
        name: '',
        description: '',
        category: '',
        speaker: '',
        file: null,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [fileType, setFileType] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    setPreviewFile(URL.createObjectURL(file));
    setFileType(file.type.split('/')[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        file,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <LinearProgress determinate value={progress} />
      <div className="container__dashboard">
        <div className="sub__container__dashboard__one">
          <Typography variant="h5">Admin Dashboard</Typography>
          <span>Add New Podcast</span>
          <Toaster />
          <form
            id="form__dashboard"
            className="form__dashboard"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Podcast Name"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Podcast Description"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="audio">Books</option>
              <option value="video">Celebrities</option>
              <option value="video">Educational</option>
              <option value="video">Lifestyle & Health</option>
              <option value="video">Sports & Recreation</option>
            </select>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleInputChange}
              placeholder="Name of the Speaker"
            />

            <input
              type="file"
              name="file"
              accept=".mp3,.mp4"
              onChange={handleFilePreview}
            />

            <button disabled={loading} className="add__podcast__btn">
              Upload
            </button>
          </form>
        </div>
        <div className="sub__container__dashboard__two">
          {formData.file ? (
            <div>
              {fileType === 'video' ? (
                <video
                  controls
                  controlsList="nodownload noremoteplayback nofullscreen"
                  disablePictureInPicture
                  disableRemotePlayback
                  style={{ width: '300px', height: '300px' }}
                >
                  <source src={previewFile} type="video/mp4" />
                </video>
              ) : (
                <audio
                  controls
                  controlsList="nodownload noremoteplayback nofullscreen"
                  disablePictureInPicture
                  disableRemotePlayback
                  style={{ width: '300px' }}
                >
                  <source src={previewFile} type="audio/mp3" />
                </audio>
              )}
            </div>
          ) : (
            <img
              src={tuneIn}
              alt=""
              style={{ width: '300px', height: '300px' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
