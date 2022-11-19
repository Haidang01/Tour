import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTour } from '../redux/features/tourSlice';
import { toast } from 'react-toastify';

export default function CardUserTours({ imageFile, description, title, tags, _id, name, createdAt }) {
  const dispatch = useDispatch()
  const excerpt = (str) => {
    if (str.length > 20) {
      str = str.substring(0, 20) + '...';
    }
    return str;
  }
  const navigate = useNavigate();
  const handleDeleteTour = (id) => {
    if (window.confirm('Are your sure your want to delete this tour ?')) {
      dispatch(deleteTour({ id, toast }))
    }
  }
  return (
    <Card sx={{ maxWidth: 345, maxHeight: '433px' }}  >

      <CardMedia
        component="img"
        height="194"
        src={imageFile}

      />
      <CardContent>
        {tags.map((tag, index) => {
          return (
            <Typography variant="p" key={index} color={'#4c9de4'} marginLeft={1} fontSize={15} >
              #{tag}
            </Typography>
          )
        })}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
          <CalendarMonthIcon fontSize='25px' />
          <p style={{ fontSize: '13px' }}>
            {moment(createdAt).fromNow()}
          </p>
        </Box>
        <Typography fontWeight={700} sx={{ marginBottom: '5px', paddingX: '5px' }} variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Typography sx={{ paddingX: '5px', maxWidth: '50px' }} variant="p" color=" #000">
          {excerpt(description)}
          <Link style={{ textDecoration: 'none', color: '#4c9de4', marginLeft: '2px' }} to={`/getTour/${_id}`} >Read More</Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
        <IconButton onClick={() => navigate(`/editTour/${_id}`)} aria-label="add to favorites">
          <FaEdit style={{ color: '#228b22' }} />
        </IconButton>
        <IconButton onClick={() => handleDeleteTour(_id)} aria-label="delete">
          <FaTrash style={{ color: 'red' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
