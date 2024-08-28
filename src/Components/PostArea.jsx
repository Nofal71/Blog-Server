import { Typography, ImageList, ImageListItem, Container, Stack, Alert, Button, Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PostArea() {
    const Posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (!localStorage.getItem('posts')) {
        console.log('............................')
        return (
            <Alert color='information'>No Post Found</Alert>
        )
    }
    return (
        <>
            <Container>
                <Stack direction='column' spacing={3} my={3}>
                    <Typography variant='h4' align='center'>Posts</Typography>
                    <Card>
                        <CardContent>
                            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                {Posts.map((item, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' ,boxShadow : '1px 1px 3px black' }}
                                        />
                                        <Box display='flex' justifyContent='center' alignItems='center' my={1}>
                                            <Link to='/currentPost'>
                                                <Button variant='outlined' align='center' size='small' onClick={() => {
                                                    localStorage.setItem('current', JSON.stringify(item))
                                                }}>View</Button>
                                            </Link>
                                        </Box>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </>
    );
}
