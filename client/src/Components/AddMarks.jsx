import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AddMarks = () => {
    const [english, setEnglish] = useState('');
    const [maths, setMaths] = useState('');
    const [chemistry, setChemistry] = useState('');
    const [physics, setPhysics] = useState('');
    const [errors, setErrors] = useState({});
    const { id } = useParams(); // Destructure studentId

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        english: Yup.number()
            .required('Mark is required')
            .min(0, 'Mark must be greater than Zero')
            .max(100, 'Mark must be less than 100'),
        maths: Yup.number()
            .required('Mark is required')
            .min(0, 'Mark must be greater than Zero')
            .max(100, 'Mark must be less than 100'),
        chemistry: Yup.number()
            .required('Mark is required')   
            .min(0, 'Mark must be greater than Zero')
            .max(100, 'Mark must be less than 100'),
        physics: Yup.number()
            .required('Mark is required')
            .min(0, 'Mark must be greater than Zero')
            .max(100, 'Mark must be less than 100'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ english, maths, chemistry, physics }, { abortEarly: false });
            await axios.post(`http://localhost:5001/addmarks/${id}`, { english, maths, chemistry, physics })
                .then(() => {
                    Swal.fire('Success', 'Marks added successfully', 'success');
                    navigate(`/marks/${id}`);  // Navigate to the MarkList view for the current student
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
                        <Card.Header as="h5" className="text-center">ADD STUDENT MARK</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>English</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="english"
                                        value={english}
                                        onChange={(e) => setEnglish(e.target.value)}
                                        placeholder="Enter a score here"
                                    />
                                    {errors.english && <div className='text-danger'>{errors.english}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Maths</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="maths"
                                        value={maths}
                                        onChange={(e) => setMaths(e.target.value)}
                                        placeholder="Enter a score here"
                                    />
                                    {errors.maths && <div className='text-danger'>{errors.maths}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Chemistry</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="chemistry"
                                        value={chemistry}
                                        onChange={(e) => setChemistry(e.target.value)}
                                        placeholder="Enter a score here"
                                    />
                                    {errors.chemistry && <div className='text-danger'>{errors.chemistry}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Physics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="physics"
                                        value={physics}
                                        onChange={(e) => setPhysics(e.target.value)}
                                        placeholder="Enter a score here"
                                    />
                                    {errors.physics && <div className='text-danger'>{errors.physics}</div>}
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    SUBMIT
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMarks;
