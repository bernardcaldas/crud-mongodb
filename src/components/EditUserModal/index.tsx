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

interface AddUser {
    id: string;
    name: string;
    email: string;
    department: string;
  }

interface IUsers {
  id: string
  name: string
  email: string
  department: string
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;  
  handleUpdateUser: (data: AddUser) => void;
  EditingUser: IUsers;
  
}



export default function EditUserModal ({isOpen, onClose, handleUpdateUser, EditingUser}: ModalProps) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");
  const [users , setUsers] = useState<IUsers[]>([]);
  const [errors, setErrors] = useState<errorsProps>()



  
  const handleSubmit = async (data: IUsers) => {
      handleUpdateUser(data);
      onClose();

    }


  
    return(
        <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl  as="form" isInvalid={!!errors}  onSubmit={() => handleSubmit} >
            <FormLabel>Name</FormLabel>
            <Input 
                id="name"
                name={name}
                placeholder="Name"
                value={EditingUser.name}
                onChange={e => setName(e.target.value)}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.name}</FormErrorMessage>}

            <FormLabel>E-mail</FormLabel>
            <Input
                id="email" 
                type="email"
                name={email}
                placeholder="E-mail"
                value={EditingUser.email}
                onChange={event => setEmail(event.target.value)}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.email}</FormErrorMessage>}
            <FormLabel>Department</FormLabel>
            <Input
                id="department" 
                name={department}
                placeholder="Department"
                value={EditingUser.department}
                onChange={event => setDepartment(event.target.value)}
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.department}</FormErrorMessage>}     
            <Button colorScheme="teal" type="submit">Update</Button>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="teal" type="submit"></Button> */}
            <Button colorScheme='blue' ml={3} onClick={onClose}>
              Close
            </Button>
            
            
          </ModalFooter>
          
        </ModalContent>
      </Modal>
      </>
    )
}