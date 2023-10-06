import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import {
    useUpdateUserMutation,
    useGetUserDetailsQuery
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUser }] =
        useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitUserHandler = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId,
            name,
            email,
            isAdmin
        };

        const result = await updateUser(updatedUser);
        if(result.error) {
            toast.error(result.error.data.message || result?.error);
        } else {
            toast.success('User updated');
            refetch();
            navigate('/admin/userlist');
        }
    };

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                 { loadingUser && <Loader /> }

                 { isLoading ? (
                    <Loader />
                 ) : error ? (
                    <Message variant='danger'>
                        {error?.data?.message || error?.error }
                    </Message>
                 ) : (
                    <Form onSubmit={submitUserHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>
                        
                        <Button variant='primary' type='submit' className='my-2'>Update</Button>
                    </Form>
                 )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
