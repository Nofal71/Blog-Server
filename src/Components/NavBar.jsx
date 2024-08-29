import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';



export default function NavBar({ setAlert, userLoggedIn, userLoggedOut }) {
  const [name, setName] = useState()
  const navigate = useNavigate('');

  const LogOut = async () => {
    userLoggedOut(false)
    setAlert({ message: 'Logout Successfuly', type: 'success' })
    navigate('/login');
  };

  useEffect(() => {
    if (userLoggedIn) {
      setName(localStorage.getItem('name'))
    }
  }, [userLoggedIn])

  return (
    <Box sx={{ flexGrow: 1 }} className='anim'>
      <AppBar position="static">
        <Toolbar>
         
          <Stack direction='row' spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" >
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}> Text Utils </Link>
            </Typography>
            <Typography variant="h6" component="div" >
              {userLoggedIn &&
                <Link to='/postArea' style={{ textDecoration: 'none', color: 'white' }}> Posts</Link>
              }
            </Typography>
          </Stack>
          {
            userLoggedIn &&
            <Button style={{ textDecoration: 'none', fontSize: '1.3rem', color: 'white' }} onClick={LogOut}> {name}  <LogoutIcon /> </Button>
          }
        </Toolbar>
      </AppBar>
    </Box >
  );
}