import { Button, Card, CardContent, Container, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ setAlert, UserLoggedIn, checkUser }) => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'firstName' && value !== undefined) localStorage.setItem('name', value);
    }

    // Firebase Account Creation System
    const SignUp = async () => {
        try {
            setLoader(true)
            await createUserWithEmailAndPassword(auth, data.email, data.password) && UserLoggedIn(true)
            setAlert({ message: 'Account Created Successfuly', type: 'success' })
            navigate('/')
        } catch (error) {
            setLoader(false)
            UserLoggedIn(false)
            setAlert({ message: `Failed To Create ${error}`, type: 'warning' })
        }
    }


    return (
        <>
            <Container style={{ marginTop: '5vh' }} className='anim'>
                <Typography variant='h4' align='center'>Signup</Typography>
                <Card>
                    <CardContent>
                        <Stack spacing={2} direction='column'>
                            <TextField name='firstName' placeholder='Enter Your First Name' label=' First Name' value={data.name} onChange={handleChange} fullWidth />
                            <TextField name='lastName' placeholder='Enter Your Last Name' label=' Last Name' value={data.name} onChange={handleChange} fullWidth />
                            <TextField name='email' placeholder='Enter Your Name' label='email' value={data.name} onChange={handleChange} fullWidth />
                            <TextField name='password' placeholder='Enter Your Name' label='password' value={data.name} onChange={handleChange} type='password' fullWidth />
                            <Typography variant='subtitle2'>Already have Account <Link to='/login'> Login </Link></Typography>
                            <Button variant='contained' size='medium' onClick={SignUp} >Create Account </Button>
                            {loader &&
                                <LinearProgress />
                            }
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
export default SignUp;
