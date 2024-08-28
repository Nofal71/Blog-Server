import { Button, Card, CardContent, Container, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const SignUp = async () => {
        try {
            setLoader(true)
            localStorage.setItem('userData', JSON.stringify(data))
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            navigate('/login')
        } catch (error) {
            setLoader(false)
            console.error(error)
        }
    }


    return (
        <>
            <Container style={{ marginTop: '5vh' }} >
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
