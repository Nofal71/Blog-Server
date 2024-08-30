import { Button, Card, CardContent, Container, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setAlert, UserLoggedIn, checkUser }) => {

    // useEffect(() => {
    //     console.log('errrorrr')
    // })

    const navigate = useNavigate()
    const [data, setData] = useState('');
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // FireBase SignIn handling
    const SignIn = async () => {
        try {
            setLoader(true)
            // FireBase authenticate user if its true , userLoggedIn states sets trur else false
            await signInWithEmailAndPassword(auth, data.email, data.password) && UserLoggedIn(true)
            navigate('/')
            return true
        } catch (error) {
            setLoader(false)
            console.error(error)
            return false
        }
    }
    const saveLocal = () => {
        localStorage.setItem('email', data.email)
        SignIn() ? setAlert({ message: 'Login Success', type: 'success' }) : setAlert({ message: 'Login Failed', type: 'warning' }) && UserLoggedIn(false);
        setData('')
    }

    // useEffect(() => {
    //     // CheckUser prop gets state if userLoggedIn or not (as sets in App.js)
    //     if (checkUser) {
    //         navigate('/')
    //     }
    // })

    return (
        <>
            <Container style={{ marginTop: '5vh' }} className='anim'>
                <Typography variant='h4' align='center'>Login</Typography>
                <Card>
                    <CardContent>
                        <Stack spacing={2} direction='column'>
                            <TextField name='email' placeholder='Enter Your Name' label='email' value={data.name} onChange={handleChange} fullWidth />
                            <TextField name='password' placeholder='Enter Your Name' label='password' value={data.name} onChange={handleChange} type='password' fullWidth />
                            <Typography variant='subtitle2'>Don't have Account <Link to='/signup'> Signup </Link></Typography>
                            <Button variant='contained' size='medium' onClick={saveLocal} > Login </Button>
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
export default Login;
