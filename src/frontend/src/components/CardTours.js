import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardTours({ imageFile, description, title, tags, _id, name, createdAt }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const excerpt = (str) => {
    if (str.length > 20) {
      str = str.substring(0, 20) + '...';
    }
    return str;
  }
  return (
    <Card sx={{ maxWidth: 345, maxHeight: '433px' }} >
      <CardHeader
        fontWeight='bold'
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={moment(createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        height="194"
        src={imageFile}

      />
      <CardContent>
        {tags.map((tag, index) => {
          return (
            <Typography variant="p" marginLeft={1} fontSize={15} color="text.secondary">
              #{tag}
            </Typography>
          )
        })}
        <Typography fontWeight={700} sx={{ marginTop: '4px', marginBottom: '5px', marginX: '9px' }} variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Typography sx={{ paddingX: '5px', maxWidth: '50px' }} variant="div" color=" #000">
          {excerpt(description)}
          <Link style={{ textDecoration: 'none', color: '#4c9de4', marginLeft: '2px' }} to={`/getTour/${_id}`} >Read More</Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
