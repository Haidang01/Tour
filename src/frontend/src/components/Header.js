import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { toast } from 'react-toastify';

const menu = [
  { page: 'Home', linkPage: '/home' },
  { page: 'Login', linkPage: '/login' },
  { page: 'Register', linkPage: '/register' },
];
const menuUser = [
  { page: 'Home', linkPage: '/home' },
  { page: 'Add Tour', linkPage: '/addTour' },
  { page: 'Dashboard', linkPage: '/dashboard' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settingsUser = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state.auth }))
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(setLogout());
    handleCloseUserMenu();
    navigate('/login');
    toast.success('Logout Successfully')
  }
  return (
    <AppBar position="fixed" sx={{ background: '#f0e6ea' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ marginX: { sm: 5 }, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#606080',
              textDecoration: 'none',
            }}
          >
            <AdbIcon sx={{ color: '#606080', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            TOUR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#606080' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user ? menuUser.map((item, index) => (
                <MenuItem key={index} onClick={() => { handleCloseNavMenu(); navigate(item.linkPage) }}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))
                :
                menu.map((item, index) => (
                  <MenuItem key={index} onClick={() => { handleCloseNavMenu(); navigate(item.linkPage) }}>
                    <Typography textAlign="center">{item.page}</Typography>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>
          <AdbIcon sx={{ color: '#606080', display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              color: '#606080'
            }}
          >
            Tour
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }} className='MuiBox-root css-2uchni'>
            {user ? menuUser.map((item, index) => (
              <Button
                key={index}
                onClick={() => { handleCloseNavMenu(); navigate(item.linkPage) }}
                sx={{ my: 2, color: '#606080', display: 'block' }}
              >
                {item.page}
              </Button>
            ))
              :
              menu.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => { handleCloseNavMenu(); navigate(item.linkPage) }}
                  sx={{ my: 2, color: '#606080', display: 'block' }}
                >
                  {item.page}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ?
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.result.name[0].toUpperCase()}</Avatar>                </IconButton>
              </Tooltip>
              : ''}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;