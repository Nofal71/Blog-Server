import { Container, Stack, TextField, Typography, Box, Button } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DescriptionIcon from '@mui/icons-material/Description';
import { db } from '../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';

export default function TextUtils({ setAlert }) {
    const [description, setdescription] = useState('')
    const [title, setTitle] = useState('')


    // FireBase 
    const user = localStorage.getItem('email')
    const ReferenceToDB = doc(db, 'users', user && user)
    const PostReference = collection(ReferenceToDB, 'posts')
    const savePost = async () => {
        const newPost = {
            title: title,
            description: description,
        };
        // Storing in FireBase
        try {
            await addDoc(PostReference, newPost)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    };

    const saveLocal = () => {
        if (title && description) {
            const newPost = {
                title: title,
                description: description,
            };
            localStorage.setItem('newPost', JSON.stringify(newPost))
            // Reset states
            setTitle(null);
            setdescription(null);
            savePost() ? setAlert({ message: 'Post saved successfully!', type: 'success' }) : setAlert({ message: 'Post save failed.', type: 'warning' });
        } else {
            setAlert({ message: 'Post save failed. Please fill in all fields.', type: 'warning' })
        }
    }

    return (
        <>
            <Container >
                <Stack direction='row' spacing={2} my={3} alignItems='center'>
                    <Typography variant='h5' > Title </Typography>
                    <TextField placeholder='Enter your Post title' value={title} onChange={(e) => setTitle(e.target.value)} size='small' />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Box display="flex" alignItems="center">
                        <Typography variant='h6'>Description</Typography>
                        <DescriptionIcon sx={{ ml: 1 }} />
                    </Box>
                    <ReactQuill
                        theme='snow'
                        value={description}
                        onChange={setdescription}
                        placeholder="Write something amazing..."
                    />
                    <Button onClick={saveLocal} variant='contained'>Save Post</Button>
                </Stack>
            </Container>
        </>
    )
}
