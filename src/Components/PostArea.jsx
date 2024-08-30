import { Typography, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

export default function PostArea({ setAlert }) {
    const user = localStorage.getItem('email')
    const ReferenceToDB = doc(db, 'users', user && user);
    const PostReference = collection(ReferenceToDB, 'posts');
    const Data = JSON.parse(localStorage.getItem('posts'));
    const [Posts, setPost] = useState(Data && Data);


    const fetchPosts = async () => {
        try {
            const postSnapshot = await getDocs(PostReference);
            const filtered = postSnapshot.docs.map((doc) => ({ ...doc.data() }))
            localStorage.setItem('posts', JSON.stringify(filtered))
            setPost(Data)
            console.log(Data)
        } catch (err) {
            console.log(err);
            setAlert({ message: `no post found , ${err}`, type: 'warning' })
        }
    };

    useEffect(() => {
        if (!Data || localStorage.getItem('newPost')) {
            fetchPosts();
            console.log('Fetching Data......................')
            console.log(Posts, 'Data Fetched ...')
            if (localStorage.getItem('newPost')) localStorage.removeItem('newPost')
        }
        console.log('......................')
    }, [Data]);
    
    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <Container>
            <Stack direction='column' spacing={3} my={3}>
                <Typography variant='h4' align='center'>Posts</Typography>
                {Data &&
                    Data.map((item) => {
                        return (
                            <Container>
                                <Stack direction='column' spacing={2}>
                                    <Typography variant='h5'>{item.title}</Typography>
                                    <Typography variant="body2" dangerouslySetInnerHTML={{ __html: item.description }} />
                                </Stack>
                            </Container>
                        )
                    })
                }

            </Stack>
        </Container>
    );
}