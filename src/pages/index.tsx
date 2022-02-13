import { 
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";

import {FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import FormModal from "../components/FormModal";
import { UsersListContext } from "../contexts/UsersListContext";
//import users from '../components/FormModal/index';


interface IUsers {
  id: number;
  name: String;
  email: String;
  department: String;
}

export default function Home() {

  const [users, setUsers] = useState<IUsers[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log('updated');
  }, [users]);
 
  
  //console.log(data);

  return (

    

    <Flex
    w="100%"
    maxWidth="100%"
    mx="auto"
    direction="column"
    >
    <Flex
      w="100%"
      h="100%"
      padding="2rem"
      bg="teal.500"
      boxShadow="2xl"
    >
      <Heading
        as="h1"
        size="xl"
        color="white"
      >
        CRUD NextJs + MongoDb</Heading>
    </Flex>
    <Flex
      justifyContent="space-between"
      w="100%"
      h="100%"
      alignContent="center"
    >
      <Text
        marginTop="2rem"
        fontSize="xl"
        paddingLeft="2rem"
      > WebApp - created using nextJs</Text>
      <Button
        marginTop="2rem"
        marginRight="2rem"
        colorScheme="teal"
        size="lg"
        leftIcon={<FaPlus />}
        onClick={() => onOpen()}
      >Add User</Button>
      <FormModal 
        isOpen={isOpen}
        onClose={onClose}
      />
    
    </Flex>
      <Box
        margin="2rem"
        borderRadius="lg"
        bg="green.50"
        
      >
        <Table size="md">
          <Thead>
            <Tr>
              <Th>AUTHOR</Th>
              <Th>EMAIL</Th>
              <Th>DEPARTMENT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(users => (

              <Tr key={users.id}>
              <Td>{users.name}</Td>
              <Td>{users.email}</Td>
              <Td>{users.department}</Td>
              <Td
                display="flex"
                justifyContent="flex-end"
              >
                <Button 
                  colorScheme="yellow"
                  size="sm"
                  leftIcon={<FaEdit/>}
                >Edit
                </Button>
                <Button
                 colorScheme="red"
                  size="sm"
                  marginLeft="1rem"
                  leftIcon={<FaTrash />}
                 >Delete</Button>
                 
              </Td>
            </Tr>))}
            
          
          </Tbody>
        </Table>
      </Box>


    </Flex>
    
  );

}