import React, { useState } from 'react';
import { Button, CardContent, TextField, Typography, Card } from '@mui/material';

const Form = (props) => {
    const [data, setData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = () => {
        if (props.onSubmit ) {
            props.onSubmit(data);
        }
    };


console.log("rerendering.......")
    const inputs = [];
    for (let i = 0; i < props.inputCount; i++) {
        const label = props[`Label${i + 1}`];
        const name = props[`Name${i + 1}`];
        const placeholder = props[`Placeholder${i + 1}`];
        const type = props[`Type${i + 1}`];
        const rows = props[`Row${i + 1}`];
        const defaultRow = props.Row;
        const width = props[`min${i + 1}`];
        inputs.push(
            <TextField
                label={label}
                name={name}
                placeholder={placeholder}
                type={type}
                value={data[name] || ''}
                onChange={handleChange}
                rows={rows || defaultRow}
                style={{ marginTop: '10px' , marginLeft: width && '5dvw' }}
                multiline={type === 'password' ? false : true}
                fullWidth={!width}
                required
            />
        );
    }

    return (
        <>
            <Card style={{ margin: '15dvh 10dvw' }}>
                <CardContent>
                    <Typography variant='h4' align='center'>
                        {props.formTitle}
                    </Typography>
                    {inputs}
                    <Button onClick={handleSubmit}
                        variant='contained'
                        color='primary'
                        style={{ marginTop: '10px' }}
                        fullWidth>Submit</Button>
                </CardContent>
            </Card>
        </>
    );
};

export default Form;
