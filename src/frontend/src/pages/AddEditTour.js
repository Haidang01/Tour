import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Stack } from '@mui/material'
import FileBase from 'react-file-base64'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { createTour, updateTour } from '../redux/features/tourSlice';

const initialState = {
  title: '',
  description: '',
  tags: []
}
const AddEditTour = () => {
  const { error, loading, userTours } = useSelector(state => ({ ...state.tour }))
  const { user } = useSelector(state => ({ ...state.auth }))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const optionTags = []
  const [receivers, setReceivers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [])

  const handleOnChangeInput = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value })
  }
  const handleClear = () => {
    setTourData({ ...initialState })
    setReceivers([]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updateTourData = { ...tourData, name: user?.result?.name, tags: receivers }
      if (!id) {
        dispatch(createTour({ updateTourData, navigate, toast }));
      } else {
        console.log(updateTourData);
        dispatch(updateTour({ id, updateTourData, navigate, toast }));
      }
    }

  }
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <Box
      display='flex'
      gap={4}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      margin='auto'
      marginTop={10}
      borderRadius={5}
      boxShadow={'5px 5px 10px #ccc'}
      sx={{
        paddingX: 10,
        paddingY: 5,
        maxWidth: 400,
        margin: 'auto',
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" textAlign={'center'} marginBottom={1} fontWeight={600} sx={{ color: "#347980" }} >{id ? 'Update Tour' : 'Add Tour'}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 2 }}>
          {/* <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} /> */}

          <TextField
            required
            id=""
            label="Title"
            value={title}
            onChange={handleOnChangeInput}
            name="title"
            fullWidth
          />
          <TextField
            onChange={handleOnChangeInput}
            name="description"
            value={description}
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="filled"
          />

          <Autocomplete
            fullWidth
            onChange={(e, value) => setReceivers((state) => value)}
            options={optionTags.map((option) => option.key)}
            multiple
            id="tags-filled"
            freeSolo
            renderTags={(value, getTagProps) =>

              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Enter Tags"
              />
            )}
          />
          <Box sx={{ width: { xs: '340px', sm: '398px' }, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <FileBase fullWidth type='file' multiple={false}
              onDone={({ base64 }) =>
                setTourData({ ...tourData, imageFile: base64 })
              } />
          </Box>
          <Button disabled={!title || !description || receivers.length === 0 || loading ? true : false} variant='contained' type='submit' alignItems='center' fullWidth color='primary'   >
            {loading ? <CircularProgress size={30} /> : null}
            <Typography variant='h6' alignContent={'center'} marginRight={'40px'} marginLeft={'10px'} >{id ? 'Update' : 'Submit'}</Typography>
          </Button>
        </Box >
      </form>
    </Box>
  )
}
export default AddEditTour;