import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/api";


interface IUsers {
    id: string
    name: string
    email: string
    department: string
  }




export function TableList() {


    const [users, setUsers] = useState<IUsers[]>([]);

    useEffect(() => {

        const interval = setInterval(() => {
          const response =  api.get('/clients').then(({ data }) => {
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
            setUsers(newData);
            //console.log('do it every second')
          });
        }, 2000);
        return () => clearInterval(interval);
      
      
    }, []);


    const handleDelete = async (id: string) => {
        await api.delete(`/clients/${id}`);
        const newUsers = users.filter((user: IUsers) => user.id !== id);
        setUsers(newUsers);
    }
  




    // useEffect(() => {

    //   async function loadUsers() {
  
    //       const response =  await api.get('/clients').then(({ data }) => {
    //       const newData: any = []
    //       const convertData = data.data
  
    //       convertData.map((item: any) => {
    //         newData.push({
    //           id: item._id,
    //           name: item.name,
    //           email: item.email,
    //           department: item.department,
    //           createdAt: item.createdAt
    //         })
    //       })
  
    //       setUsers(newData)
    //     })
  
    //   }
    //   loadUsers();
    // }, [])
  


    return (
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
            {users.map(cliente => (

            <Tr key={cliente.id}>
              <Td>{cliente.name}</Td>
              <Td>{cliente.email}</Td>
              <Td>{cliente.department}</Td>
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
                  onClick={() => {handleDelete(cliente.id)}}
                 >Delete</Button>
                 
              </Td>
            </Tr>))}
            
          
          </Tbody>
        </Table>
      </Box>

    )
}