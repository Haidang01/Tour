import { CircularProgress, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardTours from '../components/CardTours'
import { getToursByUser } from '../redux/features/tourSlice'
import CardUserTours from '../components/CardUserTours'

const DashBoard = () => {
  const { user } = useSelector(state => ({ ...state.auth }))
  const { userTours, loading } = useSelector(state => ({ ...state.tour }))
  const dispatch = useDispatch();
  const userId = user.result.id
  useEffect(() => {
    dispatch(getToursByUser(userId));
  }, [userId,])
  return (
    <>

      <Container maxWidth="lg" sx={{ paddingY: '80px' }} >
        {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vv', height: '70vh' }}>
          <CircularProgress size={30} />
          Loading...
        </div>
          :
          <>
            <Typography variant='h4' fontWeight={'600'} sx={{ color: '#f08080' }} textAlign={'center'}>Dashboard:{user.result.name}</Typography>
            <Box maxWidth={{ sm: '700px', lg: '1000px' }}
              alignContent='center' marginX='auto'
              sx={{ flexWrap: 'wrap', display: { xs: 'flex', sm: 'grid' } }}
              justifyContent='center'
              alignItems={'center'}
              gridTemplateColumns={{ sm: '1fr 1fr', lg: " 1fr 1fr 1fr" }} gap={3} >

              {userTours.length > 0 &&
                userTours.map((item, index) => {
                  return (
                    <CardUserTours key={index} {...item} />
                  )
                })

              }
              {userTours.length === 0 &&
                <Typography sx={{ color: 'red' }} variant='h2'>No Tour Found</Typography>
              }
            </Box>
          </>
        }
      </Container>
    </>
  )
}

export default DashBoard