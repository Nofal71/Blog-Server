import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar({ setAlert }) {
  const loginData = JSON.parse(localStorage.getItem('userData'))
  const [name , setName] = React.useState()
  const navigate = useNavigate('');

  const LogOut = () => {
    localStorage.removeItem('userData');
    setAlert({ message: 'Logout Successfuly', type: 'success' })
    navigate('/login');
  };
 
  React.useEffect(() => {
     if(loginData){
      setName(localStorage.getItem('name'))
      console.log(name)
     }
  }, [loginData])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Stack direction='row' spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" >
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}> Text Utils </Link>
            </Typography>
            <Typography variant="h6" component="div" >
              {loginData &&
                <Link to='/postArea' style={{ textDecoration: 'none', color: 'white' }}> Posts</Link>
              }
            </Typography>
          </Stack>
          {
            loginData &&
            <Button style={{ textDecoration: 'none', fontSize: '1.3rem', color: 'white' }} onClick={LogOut}> {name}  <LogoutIcon /> </Button>
          }
        </Toolbar>
      </AppBar>
    </Box >
  );
}