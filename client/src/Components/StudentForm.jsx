import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/, 'Please enter a name containing only alphabetic characters.')
            .trim()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/, 'Please enter a valid gmail address (e.g., example@gmail.com).')
            .email('Invalid email format')
            .required('Email is required'),
        age: Yup.number()
            .required('Age is required')
            .min(3, 'Age must be at least 3')
            .max(99, 'Age must be less than 99')
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ name, email, age }, { abortEarly: false });
            await axios.post('http://localhost:5001/addstudent', { name, email, age })
                .then(() => {
                    Swal.fire('Success', 'Student added successfully', 'success');
                    navigate('/');
                }).catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        toast.error(err.response.data.message);
                        setErrors({ form: err.response.data.message });
                    } else {
                        toast.error('An error occurred. Please try again later.');
                    }
                });
        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error(error);
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header as="h5" className="text-center">Add New Student</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter name"
                                    />
                                    {errors.name && <div className='text-danger'>{errors.name}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && <div className='text-danger'>{errors.email}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Enter age"
                                    />
                                    {errors.age && <div className='text-danger'>{errors.age}</div>}
                                </Form.Group>


                                <Button variant="primary" type="submit" className="w-100">
                                    Add Student
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StudentForm;
