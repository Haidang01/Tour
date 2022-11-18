import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import CardTours from '../components/CardTours'
import Header from '../components/Header'
import { getTours } from '../redux/features/tourSlice'
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const { loading, tours } = useSelector(state => ({ ...state.tour }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTours());
  }, [])


  return (
    <>

      <Container maxWidth="lg" sx={{ paddingY: '80px' }} >
        {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vv', height: '70vh' }}>
          <CircularProgress size={30} />
          Loading...
        </div>
          :
          <Box maxWidth={{ sm: '700px', lg: '1000px' }}
            alignContent='center' marginX='auto'
            sx={{ flexWrap: 'wrap', display: { xs: 'flex', sm: 'grid' } }}
            justifyContent='center'
            alignItems={'center'}
            gridTemplateColumns={{ sm: '1fr 1fr', lg: " 1fr 1fr 1fr" }} gap={3} >

            {tours.length > 0 &&
              tours.map((item, index) => {
                return (
                  <CardTours key={index} {...item} />
                )
              })

            }
            {tours.length === 0 &&
              <Typography sx={{ color: 'red' }} variant='h2'>No Tour Found</Typography>
            }
          </Box>
        }
      </Container>
    </>
  )
}

export default Home