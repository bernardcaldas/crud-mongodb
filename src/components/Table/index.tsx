import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import FormModal from "../../components/FormModal";
import EditUserModal from "../EditUserModal";


interface IUsers {
    id: string
    name: string
    email: string
    department: string
  }




export function TableList() {


    const [users, setUsers] = useState<IUsers[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [id, setId] = useState("");
    const [EditingUser, setEditingUser] = useState<IUsers>({} as IUsers);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const toggleEditModal = () => {

      setEditModalOpen(!editModalOpen);
    }


    

    // const handleUpdateClient = async (id: string) => {
    //     // e.preventDefault();
    //     const {data} = await api.put(`/clients/${id}`, {name, email, department});
    //     setUsers([...users, data]);
    //     console.log(data)
    //     // setEmail("");
    //     // setName("");
    //     // setDepartment("");
    //     // onClose();
    //     onOpen();
    // }

    // const handleUpdateClientModal = async () => {
    //   const {data} = await api.put(`/clients/${id}`, {name, email, department});
    //     setName(data.data.name);
    //     setEmail(data.data.email);
    //     setDepartment(data.data.department);
    //     setId(data.data._id);
    //     console.log(data);
        
    // }

 

    // const handleEdit = async (client: IUsers) => {
    //     await api.put(`/clients/${id}`, {name, email, department});
    //     setUsers(users.map((user: IUsers) => (user.id === id ? {...user, name, email, department} : user)));
    //     // setName(data.name);
    //     // setEmail(data.email);
    //     // setDepartment(data.department);
    //     // setId(data.id);
    //     onOpen();
    // }


    const handleDelete = async (id: string) => {
        await api.delete(`/clients/${id}`);
        const newUsers = users.filter((user: IUsers) => user.id !== id);
        setUsers(newUsers);
    }

    // const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    //   onOpen();
    //   setUsers({...users, 
    //     [e.target.name]: e.target.value,

    //   });
    // }

    const handleEditFood = (cliente: IUsers) => {
      setEditingUser(cliente);
      setEditModalOpen(true)
      console.log(EditingUser)
    }
    const handleShowUpdate = ({id,name,email, department}: IUsers) => {
      setId(id);
      setName(name);
      setEmail(email);
      setDepartment(department);
      onOpen();
      console.log({id,name,email,department})
      
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
                  onClick={()=> handleEditFood(cliente)}
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
        <FormModal 
        isOpen={isOpen}
        onClose={onClose}
      />
        <EditUserModal 
        isOpen={editModalOpen}
        EditingUser={EditingUser}
        onClose={toggleEditModal}
        handleUpdateUser={handleShowUpdate}
        />
      </Box>


    )
}