import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormErrorMessage,
    VStack,
    Input,
    FormLabel,
    FormControl,
    FormHelperText,
    useDisclosure,
    
    
  } from '@chakra-ui/react'

import React, { useState } from 'react';
import api from '../../services/api';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
}

type Users = {
  id: number;
  name: string;
  email: string;
  department: string;
}




export default function FormModal ({isOpen, onClose}: ModalProps) {

  


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");
  const [users , setUsers] = useState<Users[]>([]);
  const [errors, setErrors] = useState<errorsProps>()

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const {data} = await api.post('/clients', {name, email, department});

    // const newUser: Users = {
    //   id: Math.random(),
    //   name: name,
    //   email: email,
    //   department: department,
    // };
    setUsers([...users, data]);
    setEmail("");
    setName("");
    setDepartment("");
    onClose();


    console.log({users})
  }

  

    
    return(
        <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Register New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl  as="form" isInvalid={!!errors} onSubmit={handleCreateClient} >
            <FormLabel>Name</FormLabel>
            <Input 
                id="name"
                name={name}
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.name}</FormErrorMessage>}

            <FormLabel>E-mail</FormLabel>
            <Input
                id="email" 
                type="email"
                name={email}
                placeholder="E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.email}</FormErrorMessage>}
            <FormLabel>Department</FormLabel>
            <Input
                id="department" 
                name={department}
                placeholder="Department"
                value={department}
                onChange={event => setDepartment(event.target.value)}
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.department}</FormErrorMessage>}     
            <Button colorScheme="teal" type="submit">Teste</Button>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" type="submit">Register</Button>
            <Button colorScheme='blue' ml={3} onClick={onClose}>
              Close
            </Button>
            
            
          </ModalFooter>
          
        </ModalContent>
      </Modal>
      </>
    )
}