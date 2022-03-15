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

import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

import { useRouter} from 'next/router';

interface IUsers {
  id: string
  name: string
  email: string
  department: string
}


interface ModalProps {
  user: IUsers;
  isOpen: boolean;
  onClose: () => void;  
  onUpdateUser: (id: string, user: IUsers) => void;
 
}

export default function EditUserModal (props: ModalProps) {

  const  [user, setUser] = useState(props.user);
  // const [name, setName] = useState(EditingUser.name)
  // const [email, setEmail] = useState(EditingUser.email);
  // const [department, setDepartment] = useState(EditingUser.department);
  // const [id, setId] = useState(EditingUser.id);
  // const [EditingUser, setEditingUser] = useState<IUsers[]>([]);
  const [errors, setErrors] = useState<errorsProps>()

  useEffect(() => {
    setUser(props.user);
  }, [props]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.email || !user.name) {
      console.log("em");
      return false;
    }
    props.onUpdateUser(user.id, user);
    props.onClose();
  };
    


  
  // const handleSubmit = async (data: IUsers) => {
  //     handleUpdateUser(data);
  //     onClose();

  //   }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const {data} = await api.put(`/users/${EditingUser.id}`, {name, email, department});

  //   handleUpdateUser(
  //     {
  //       id,
  //       name,
  //       email,
  //       department,
  //     }
  //   );
  //   onClose();
  // }
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const {data} = await api.put(`/users/${EditingUser.id}`, {name, email, department});

  //   handleUpdateUser(data);
  //   onClose();
  // }


  
    return(
        <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl  as="form" isInvalid={!!errors}  onSubmit={() => onFormSubmit} >
            <FormLabel>Name</FormLabel>
            <Input 
                id="name"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={onInputChange}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.name}</FormErrorMessage>}

            <FormLabel>E-mail</FormLabel>
            <Input
                id="email" 
                type="email"
                name="email"
                placeholder="E-mail"
                value={user.email}
                onChange={onInputChange}
                
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.email}</FormErrorMessage>}
            <FormLabel>Department</FormLabel>
            <Input
                id="department" 
                name="department"
                placeholder="Department"
                value={user.department}
                onChange={onInputChange}
            />
            {!!errors && <FormErrorMessage textColor="red.300">{errors.department}</FormErrorMessage>}     
            <Button colorScheme="teal" type="submit" mt="6">Update</Button>
            </FormControl>
            
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="teal" type="submit">Update User</Button> 
            <Button colorScheme='blue' ml={3} onClick={onClose}>
              Close
            </Button>
            
            
          </ModalFooter>
           */}


        </ModalContent>
      </Modal>
      </>
    )
}
