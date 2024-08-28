import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Post() {
    const Post = JSON.parse(localStorage.getItem('current'));
    console.log(Post, 'current');
    return (
        <>

            <Card>
                <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                    <CardContent >
                        <Typography align='center' variant='h4'>{Post.title} </Typography>
                    </CardContent>
                    <CardContent>
                        <img src={Post.image} style={{ objectFit: 'cover', maxHeight: '50vh', maxWidth: '100vw' }} alt={Post.title} />
                    </CardContent>
                    <CardContent>
                        <Typography variant='h5'>Description</Typography>
                        <Typography variant='body1' align='center'>
                            <div dangerouslySetInnerHTML={{ __html: Post.description }} />
                        </Typography>

                    </CardContent>
                </Stack>
            </Card>

        </>
    )
}
