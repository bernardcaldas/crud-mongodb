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
} from "@chakra-ui/react";

import {FaPlus, FaEdit, FaTrash} from 'react-icons/fa';

export default function Home() {
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
      >Add User</Button>
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
              <Th>EMPLOYED</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Bernardo Caldas</Td>
              <Td>bernardo.caldas@gmail.com</Td>
              <Td>24/02/2021</Td>
              <Td>
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
            </Tr>
            
          
          </Tbody>
        </Table>
      </Box>


    </Flex>
  )

}