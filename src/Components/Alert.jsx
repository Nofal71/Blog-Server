import { Alert, Stack } from '@mui/material'
import React from 'react'

export default function AlertMessage(props) {
    return (
        <>
            <Stack className='anim' style={{ position: 'absolute', top: '4px', right: '4px' }} >
                <Alert severity={props.type}>{props.message}</Alert>
            </Stack>
        </>
    )
}
