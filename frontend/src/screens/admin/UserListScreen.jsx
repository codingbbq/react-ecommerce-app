import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    const { data: users, refetch,  isLoading, error } = useGetUsersQuery();

    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteUserHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete the user?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted!');
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error?.error);         
            }
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck color='green'></FaCheck>
                                    ) : (
                                        <FaTimes color='red'></FaTimes>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button
                                            className='btn-sm'
                                            variant='light'
                                        >
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm mx-2' onClick={() => deleteUserHandler(user._id)}>
                                        <FaTrash color='white' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
