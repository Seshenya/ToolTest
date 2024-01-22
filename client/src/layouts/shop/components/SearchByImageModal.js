import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import MDButton from 'components/MDButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import MDSnackbar from 'components/MDSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';

const SearchByImageModal = ({
  openModal,
  onClose,
  setOpenModal,
  reCallApi,
  filtersRef,
}) => {
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
  } = useForm();
  const axiosPrivate = useAxiosPrivate();

  const [sb, setSb] = useState({
      open: false,
      color: '',
      icon: '',
      title: '',
      message: '',
  });

  const handleDrop1 = (e) => {
      e.preventDefault();
      setIsDragging1(false);
      const files = e.dataTransfer.files;
      console.log('Dropped files:', files);
      setUploadedMedia([...uploadedMedia, ...files]);
      setValue('media', files);
  };

  const handleResetFiles = () => {
      setUploadedMedia([]);
  };

  const handleFormSubmit = (data) => {
      if (!isSubmitting) {
          setIsSubmitting(true);
          onSubmit(data);
      }
  };

  const handleDragEnter1 = (e) => {
      e.preventDefault();
      setIsDragging1(true);
  };

  const handleDragLeave1 = (e) => {
      e.preventDefault();
      setIsDragging1(false);
  };

  const handleFileInputChange1 = (e) => {
      console.log('File Input Change:', e.target.files);
      const currentMedia = uploadedMedia;
      for (const file of e.target.files) {
          currentMedia.push(file);
      }
      setUploadedMedia([...currentMedia]);
      setValue('media', currentMedia);
  };

  const handleImageSearch = async (formData) => {
      try {
          const response = await axiosPrivate.post('/image/', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  maxcontentlength: 'Infinity',
              },
          });

          if (response.status === 200) {
              const data = response.data
              filtersRef.current.query = data;
              reCallApi(filtersRef.current);
              setOpenModal(false)
              reset()
          } else {
              console.error('Failed to process Image');
          }
      } catch (error) {
          console.error('Error Processing Image:', error);
      } finally {
          setIsSubmitting(false);
          setOpenModal(false);
          handleResetFiles();
          reset();
      }
  };

  const closeSb = () => {
      setSb({
          open: false,
          color: '',
          icon: '',
          title: '',
          message: '',
      });
  };

  const onSubmit = (data) => {
      if (!data.media || data.media.length === 0) {
          setSb({
              open: true,
              color: 'error',
              icon: 'error',
              title: 'Error: Please add atleast one image file',
              message: '',
          });
          setIsSubmitting(false);
          return;
      }

      console.log('On Submit:', data);

      const formData = new FormData();
      formData.append(
          'file_format',
          data.media[0]?.name.split('.').pop().toLowerCase()
      );

      for (const media of data.media) {
          formData.append('media', media);
      }

      formData.forEach((value, key) => {
          console.log(key + ' ' + value);
      });

      handleImageSearch(formData);
  };

  const onReset = () => {
      reset();
  };

  const handleDeleteFileMedia = (index, fileType) => {
      let updatedFiles = [];
      updatedFiles = uploadedMedia.filter((_, idx) => idx !== index);
      setUploadedMedia([...updatedFiles]);
      setValue('media', [...updatedFiles]);
  };

  useEffect(() => {
      console.log('Uploaded Media:', uploadedMedia);
  }, [uploadedMedia]);

  return (
      <Dialog
          open={openModal}
          onClose={onClose}
          fullScreen
          onClick={(e) => e.stopPropagation()}
      >
          <DialogTitle id="update-status-title">
              Add Image
          </DialogTitle>
          <DialogContent>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                  {errors.title && (
                      <span
                          role="alert"
                          style={{
                              color: 'red',
                              fontSize: '0.8rem',
                              marginTop: '0.8rem',
                              display: 'block',
                          }}
                      >
                          {errors.title.message}
                      </span>
                  )}
                  <MDBox
                      border={
                          isDragging1 || uploadedMedia.length === 0
                              ? '2px dashed #aaa'
                              : '2px dashed #ccc'
                      }
                      borderRadius="5px"
                      padding="20px"
                      marginBottom="20px"
                      textAlign="center"
                      onDragOver={(e) => handleDragEnter1(e)}
                      onDragEnter={(e) => handleDragEnter1(e)}
                      onDragLeave={(e) => handleDragLeave1(e)}
                      onDrop={(e) => handleDrop1(e)}
                  >
                      {
                          <MDTypography
                              variant="h3"
                              color="primary"
                              gutterBottom
                          >
                              Image File
                          </MDTypography>
                      }
                      <MDTypography
                          variant="body1"
                          color="secondary"
                          gutterBottom
                      >
                          {isDragging1
                              ? 'Drop your file here'
                              : 'Drag and drop your file here'}
                      </MDTypography>
                      <MDTypography
                          variant="body1"
                          color="secondary"
                          gutterBottom
                      >
                          OR
                      </MDTypography>
                      <MDButton
                          variant="outlined"
                          component="label"
                          color="primary"
                      >
                          Upload File
                          <input
                              type="file"
                              onChange={handleFileInputChange1}
                              hidden
                          />
                      </MDButton>
                      {uploadedMedia.length === 0 && (
                          <span
                              role="alert"
                              style={{
                                  color: 'primary',
                                  fontSize: '0.8rem',
                                  marginTop: '0.8rem',
                                  display: 'block',
                              }}
                          >
                              Please add atleast one file
                          </span>
                      )}
                      {uploadedMedia.map((file, index) => (
                          <MDBox
                              key={index}
                              display="flex"
                              alignItems="center"
                              marginTop="10px"
                              padding="5px"
                              border="1px solid #ccc"
                          >
                              <MDTypography
                                  variant="body1"
                                  color="secondary"
                                  sx={{ flex: '1 1 auto' }}
                              >
                                  {file.name}
                              </MDTypography>
                              <IconButton
                                  color="error"
                                  onClick={() =>
                                      handleDeleteFileMedia(
                                          index,
                                          'media'
                                      )
                                  }
                              >
                                  <DeleteIcon />
                              </IconButton>
                          </MDBox>
                      ))}
                  </MDBox>
                  {errors.tags && (
                      <span
                          role="alert"
                          style={{
                              color: 'red',
                              fontSize: '0.8rem',
                              marginBottom: '0.8rem',
                              display: 'block',
                          }}
                      >
                          {errors.tags.message}
                      </span>
                  )}
                  <DialogActions>
                      <MDButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: 2 }}
                          disabled={isSubmitting}
                      >
                          {isSubmitting
                              ? 'Submitting...'
                              : 'Submit Image'}
                      </MDButton>
                      <MDButton
                          onClick={(e) => {
                              e.stopPropagation();
                              handleResetFiles();
                              onReset(e);
                          }}
                          color="secondary"
                      >
                          Reset
                      </MDButton>
                      <MDButton
                          onClick={(e) => {
                              e.stopPropagation();
                              handleResetFiles();
                              onReset(e);
                              onClose(e);
                          }}
                      >
                          Cancel
                      </MDButton>
                  </DialogActions>
              </form>
          </DialogContent>
          <MDSnackbar
              color={sb.color}
              icon={sb.icon}
              title={sb.title}
              content={sb.message}
              open={sb.open}
              onClose={closeSb}
              close={closeSb}
              bgWhite
          />
      </Dialog>
  );
};

export default SearchByImageModal;
