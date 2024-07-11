import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../index.css'

const MarkList = () => {
    const [student, setStudent] = useState({});
    const [marks, setMarks] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5001/fetchmarks/${id}`)
            .then((response) => {
                setStudent(response.data.student);
                setMarks(response.data.marks[0]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-center">Student Details</h2>
                    <div className="row">
                        <Link to="/" className="back">&larr; Back</Link>
                        <div className="col-md-6 details">
                            <p><strong>Name:</strong> {student.name}</p>
                            <p><strong>Email:</strong> {student.email}</p>
                            <p><strong>Age:</strong> {student.age}</p>
                        </div>
                        { marks ? ( 
                             <div className="col-md-6">
                             <h2 className="text-center">Marks</h2>
                             <table className="table table-striped">
                                 <thead>
                                     <tr>
                                         <th scope="col">Subject</th>
                                         <th scope="col">Mark</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr>
                                         <td>English</td>
                                         <td>{marks.english}</td>
                                     </tr>
                                     <tr>
                                         <td>Maths</td>
                                         <td>{marks.maths}</td>
                                     </tr>
                                     <tr>
                                         <td>Chemistry</td>
                                         <td>{marks.chemistry}</td>
                                     </tr>
                                     <tr>
                                         <td>Physics</td>
                                         <td>{marks.physics}</td>
                                     </tr>
                                 </tbody>
                             </table>
                         </div>
                        ) : (
                            <div>
                                <p>No Marks Added</p>
                                <Link to={`/addmarks/${student.id}`} className="btn btn-primary">ADD MARKS</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkList;
