import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Visibility } from '@mui/icons-material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const initialState = { email: '', password: '' };
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector(state => ({ ...state.auth }))
  const [checkEmail, setCheckEmail] = useState(false);
  const [check, setCheck] = useState(false);
  let { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChangeInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    setCheck(true);
    const regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error('Please enter a valid email address');
      setCheckEmail(true);

      return;
    } else {
      setCheck(false);
    }
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error])
  return (
    <Box
      display='flex'
      gap={2}
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
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
        <Typography variant="h4" color="initial">Sign In</Typography>
      </Box>
      <TextField

        helperText={checkEmail && check ? "Invalid email" : null}
        error={checkEmail && check ? true : false}
        required
        id=""
        label="Email"
        value={email}
        onChange={handleOnChangeInput}
        name="email"
        fullWidth
      />
      <FormControl fullWidth sx={{ m: 1, }} variant="outlined" >
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            name="password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={handleOnChangeInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPass(!showPass)}
                  edge="end"
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </FormControl>
      <Button alignItems='center' disabled={!email || !password || loading ? true : false} variant='contained' onClick={handleSubmit} fullWidth color='warning'>
        {loading ? <CircularProgress size={30} /> : null}  <Typography variant='h6' alignContent={'center'} marginRight={'40px'} marginLeft={'10px'} >Login</Typography>
      </Button>

      <Typography variant='p' marginTop={1}>
        <Link to={'/register'}  >
          Don't have an account ? Sign Up
        </Link>
      </Typography>
    </Box >

  )
}

export default Login