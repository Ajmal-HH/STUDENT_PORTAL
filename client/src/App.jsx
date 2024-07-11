import { Container } from 'react-bootstrap';
import StudentList from './Components/StudentList';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './Components/StudentForm';
import UpdateData from './Components/UpdateData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkList from './Components/MarkList';
import AddMarks from './Components/AddMarks';

const App = () => {
  return (
    <Container>
      <ToastContainer />
      <Router>
        <Routes>
        <Route path='/' element={<StudentList />} />
        <Route path='/addstudent' element={<StudentForm />} />
        <Route path='/update/:id' element={<UpdateData />} />
        <Route path='/marks/:id' element={<MarkList />} />
        <Route path='/addmarks/:id' element={<AddMarks />} />
        </Routes>
    </Router>
    </Container>
  );
};

export default App;
