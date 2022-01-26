import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Stack,
    Button,
  } from '@chakra-ui/react'
import { useState } from 'react';


interface InputFormProps {
    
    error?: string;
    name: string;
    label: string;
    value: string;
    
}

export default function InputForm({ error, name, label, value,  ...rest}:InputFormProps){

    return (
        
        <FormControl isInvalid={!!error} as="form" onSubmit={() => {}}>
        <FormLabel>{label}</FormLabel>
        <Input 
            name={name}
            placeholder={label}
            value={value}
            
            {...rest}
        ></Input>
        {!!error && <FormHelperText textColor="red.300">{error}</FormHelperText>}
        </FormControl>
       
    )
}