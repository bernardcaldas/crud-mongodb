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
import { GetServerSideProps } from "next";
import { useState, useContext, useEffect } from "react";

import {FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import FormModal from "../components/FormModal";
import api from "../services/api";
import router, { useRouter} from 'next/router';
import { TableList } from "../components/Table";




interface IUsers {
  id: string
  name: string
  email: string
  department: string
}


export default function Home() {

  
  const [users, setUsers] = useState<IUsers[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

//  const handleAddUsers = async () => {
//     const {data} = await api.post('/clients', {name, email, department});
//     setUsers([...users, data]);
//     setEmail("");
//     setName("");
//     setDepartment("");
//     onClose();
//   }
  useEffect(() => {
    api.get('/clients').then(({ data }) => {
        const newData: any = []
        const convertData = data.data
        convertData.map((item: any) => {
          newData.push({
            id: item._id,
            name: item.name,
            email: item.email,
            department: item.department,
            createdAt: item.createdAt
          })
        })
  setUsers(data.data);
  })
  }, []);
    
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
    <TableList />
      

    </Flex>
    
  );
  
}




