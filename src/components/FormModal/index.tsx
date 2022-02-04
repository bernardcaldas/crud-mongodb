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
import { useState, useContext } from 'react';



export interface UserProps {
  id: String;
  name: String;
  email: String;
  department: String;
}

interface errorsProps {
  name?: String;
  email?: String;
  department?: String;
}

interface Props {
  state: boolean;
  name: string;
  setName(): string;
}






export default function FormModal ({state, name, setName}: Props) {

  //const data = useContext(UsersListContext);
  const {onClose} = useDisclosure()

  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");
  const [clients, setClients] = useState<UserProps[]>([]);
  const [errors, setErrors] = useState<errorsProps>()


  const isValidFormData = () => {
    if(!name) {
      setErrors({name: 'email is required'})
      return false;
    }
    if(!email) {
      setErrors({
        email: 'Email is required'
      });
      return false;
    }
    if(!department) {
      setErrors({department: 'Department is required'});
      return false;
    }
    setErrors({});
    return true;
  }

  const handleSubmitCreateClient = (e: any) => {
    e.preventDefault();
    if(!isValidFormData()) return
    const newClient: UsersList = {
      id: new Date().getMilliseconds().toString(),
      name,
      email,
      department
    }
    setClients([...clients, newClient]);
    setName(""); 
    setEmail("");
    setDepartment("");
   
    console.log({clients});
    //console.log({name, email, department});


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