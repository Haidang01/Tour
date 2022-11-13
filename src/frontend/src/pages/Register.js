import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Grid } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Visibility } from '@mui/icons-material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfimPass, setShowConfimPass] = useState(false);
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector(state => ({ ...state.auth }))
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [check, setCheck] = useState(false);
  let { firstName, lastName, email, password, confirmPassword } = formValue;
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
    if (firstName && lastName && email && password && confirmPassword) {
      setCheckPass(false)
      if (password !== confirmPassword) {
        setCheckPass(true)
        toast.error('Passwords do not match');
        return;
      } else {
        dispatch(register({ formValue, navigate, toast }));
      }
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
      marginTop={3}
      borderRadius={5}
      boxShadow={'10px 10px 10px 10px #ccc'}
      sx={{
        paddingX: 10,
        paddingY: 4,
        maxWidth: 450,
        ':hover': {
          boxShadow: '10px 10px 20px 10px #ccc',
        },

      }}

    >
      <Box marginBottom={2} alignItems='center'>
        <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
        <Typography variant="h4" color="initial">Sign Up</Typography>
      </Box>
      <Box display={'flex'} gap={2.5} fullWidth >
        <TextField
          required
          label="FirstName"
          value={firstName}
          onChange={handleOnChangeInput}
          name="firstName"
        />
        <TextField
          required
          label="LastName"
          value={lastName}
          onChange={handleOnChangeInput}
          name="lastName"
        />
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
          <InputLabel error={checkPass ? true : false} htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            error={checkPass ? true : false}
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
      <FormControl fullWidth sx={{ m: 1, }} variant="outlined" >
        <FormControl variant="outlined">
          <InputLabel error={checkPass ? true : false} htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            error={checkPass ? true : false}
            id="outlined-adornment-password"
            fullWidth
            name="confirmPassword"
            type={showConfimPass ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleOnChangeInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfimPass(!showConfimPass)}
                  edge="end"
                >
                  {showConfimPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </FormControl>
      <Button alignItems='center' disabled={!email || !password || !firstName || !lastName || !confirmPassword || loading ? true : false} variant='contained' onClick={handleSubmit} fullWidth color='warning'>
        {loading ? <CircularProgress size={30} /> : null}
        <Typography
          variant='h6'
          alignContent={'center'}
          marginRight={'40px'}
          marginLeft={'10px'}
        >
          Register
        </Typography>
      </Button>

      <Typography variant='p' marginTop={1}>
        <Link to={'/login'}  >
          Already have an account ? Sign In
        </Link>
      </Typography>
    </Box >

  )
}

export default Register