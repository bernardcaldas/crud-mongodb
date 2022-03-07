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

import React, { useRef, useState } from 'react';
import api from '../../services/api';

import { useRouter} from 'next/router';



interface IUsers {
  id: string
  name: string
  email: string
  department: string
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // handleAddUsers: (data: IUsers) => void;
  
}



export default function FormModal ({isOpen, onClose}: ModalProps) {


  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");
  const [users , setUsers] = useState<IUsers[]>([]);
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
    
  }
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {data} = await api.put(`/clients/${id}`, {name, email, department});
    setUsers([...users, data]);
    setEmail("");
    setName("");
    setDepartment("");
    onClose();

  }

  

    
    return(
        <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>{name !== "" ? name : "New Register"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl  as="form" isInvalid={!!errors}  onSubmit={handleCreateClient}>
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
            <Button colorScheme="teal" type="submit" mt="6">Register</Button>
            </FormControl>
            
          </ModalBody>

        
        
          
        </ModalContent>
      </Modal>
      </>
    )
}