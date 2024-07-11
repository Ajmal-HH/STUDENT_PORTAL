/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from './Pagination';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const records = students.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        axios.get('http://localhost:5001/liststudent')
            .then((response) => {
                setStudents(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5001/delete/${id}`)
                    .then(() => {
                        setStudents(students.filter(student => student.id !== id));
                        Swal.fire('Success', 'Student deleted successfully', 'success');
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire('Error', 'Failed to delete student', 'error');
                    });
            }
        });
    };

    return (
        <>
            <h1>Student Portal Manager</h1>
            <div className="search">
                <Link to="/addstudent" className="btn btn-success" style={{ height: '40px' }}>
                    ADD NEW STUDENT
                </Link>
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        style={{ width: 'auto', height: '40px', marginLeft: '15px' }}
                    />
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.name.toLowerCase().includes(search.toLowerCase());
                    }).map((d, i) => (
                        <tr key={d.id}>
                            <th scope="row">{i + 1 + indexOfFirstItem}</th>
                            <td> <Link to={`/marks/${d.id}`} className='back'>{d.name}</Link></td>
                            <td>{d.email}</td>
                            <td>{d.age}</td>
                            <td>
                                <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary' style={{ marginRight: '10px' }}>Update</Link>
                                <button onClick={() => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={students.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </>
    );
};

export default StudentList;
