import { CardMedia, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import tourSlice, { getTour } from '../redux/features/tourSlice';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';

const SingleTour = () => {

  const dispatch = useDispatch();
  const { tour, loading } = useSelector(state => ({ ...state.tour }));
  const { imageFile, title, name, tags, description, createdAt } = tour;
  console.log('kkk', tour);
  const id = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id])
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingY: '80px' }}>
        {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vv', height: '70vh' }}>
          <CircularProgress size={30} />
          Loading...
        </div>
          : <Stack sx={{ border: '1px solid #ccc', background: '#fff', boxShadow: '2px 2px 2px 1px #ccc', borderRadius: '5px' }}>
            <CardMedia
              component="img"
              sx={{ maxHeight: '400px', marginBottom: '10px', objectFit: 'cover' }}
              src={imageFile}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingX: 10, paddingBottom: 3 }}>
              <Typography variant='h4' textAlign={'center'} color='#000' fontWeight={600}>{title}</Typography>
              <Typography color={'#000'} variant='p'> Created By: {name}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {tags && tags.map((tag, index) => {
                  return (
                    <Typography variant='body2' color={'#655b5b'} key={index} >#{tag}</Typography>
                  )
                })}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
                <CalendarMonthIcon fontSize='25px' />
                <p style={{ fontSize: '13px' }}>
                  {moment(createdAt).fromNow()}
                </p>
              </Box>
              <Typography variant='p' color={'#655b5b'}> {description}</Typography>
            </Box>
          </Stack>
        }
      </Container>
    </>
  )
}

export default SingleTour