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
    
    
  } from '@chakra-ui/react'
import { useState } from 'react';



interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FormModal({isOpen, onClose}: FormModalProps) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({name:'', email: '', department: ''});


  const isValidFormData = () => {
    if(!name) {
      setError({...error, name: 'Name is required'});
      return false;
    }
    if(!email) {
      setError({...error, email: 'Email is required'});
      return false;
    }
    if(!department) {
      setError({...error, department: 'Department is required'});
      return false;
    }
    setError({...error, name: '', email: '', department: ''});
    return true;
  }

  const handleSubmitCreateClient = (e: any) => {
    e.preventDefault();
    if(!isValidFormData()) return
    console.log({name, email, department});
    
    setName('');
    setEmail('');
    setDepartment('');

  }

  

    
    return(
        <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Register New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl  as="form" isInvalid={!!error} onSubmit={handleSubmitCreateClient} >
            <FormLabel>Name</FormLabel>
            <Input 
                id="name"
                name={name}
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}
                
            />
            {!!error && <FormErrorMessage textColor="red.300">{error.name}</FormErrorMessage>}

            <FormLabel>E-mail</FormLabel>
            <Input
                id="email" 
                type="email"
                name={email}
                placeholder="E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                
            />
            {!!error && <FormErrorMessage textColor="red.300">{error.email}</FormErrorMessage>}
            <FormLabel>Department</FormLabel>
            <Input
                id="department" 
                name={department}
                placeholder="Department"
                value={department}
                onChange={event => setDepartment(event.target.value)}
            />
            {!!error && <FormErrorMessage textColor="red.300">{error.department}</FormErrorMessage>}     
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