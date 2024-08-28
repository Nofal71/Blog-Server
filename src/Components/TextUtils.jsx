import { Button, Card, CardContent, Container, ImageList, ImageListItem, Stack, TextField, Typography, Box } from '@mui/material';
import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import { auth } from '../config/firebase';

export default function TextUtils() {
    const [description, setdescription] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [buttonLabel, setButtonLabel] = useState('Set');


    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setButtonLabel('Change')
        }
    };

    const savePost = () => {
        if (title && description && image) {
            const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const newPost = {
                image: image,
                title: title,
                description: description,
            };
            const updatedPosts = [...existingPosts, newPost];
            console.log(updatedPosts)
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setImage(null);
            setTitle('');
            setdescription('');
        } else {
            alert('Post Save Failed')
        }
    };

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
                </Stack>
                <Stack direction='column' spacing={3} my={2}>
                    <Card>
                        <CardContent>
                            <Stack direction='column' spacing={2}>
                                <Typography variant='h6'>Set Image For Your Post</Typography>
                                <ImageList cols={1}>
                                    <ImageListItem>
                                        <img src={image} style={{ objectFit: 'cover', maxWidth: '300px', maxHeight: '30vh' }} alt='...' />
                                    </ImageListItem>
                                </ImageList>

                            </Stack>
                        </CardContent>
                        <CardContent>
                            <Button variant='outlined' startIcon={<ImageIcon />} onClick={handleImageClick}>{buttonLabel} Image</Button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </CardContent>
                        <CardContent style={{ justifyContent: 'center', display: 'flex' }}>
                            <Button onClick={savePost} variant='contained' style={{ width: '30vw' }}>Save Post</Button>
                        </CardContent>

                    </Card>

                </Stack>
            </Container>
        </>
    )
}
