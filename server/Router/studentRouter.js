import express from 'express'
import { addMarks, addStudent, deleteStudent, fetchStudentData, fetchStudentsMark, listStudent, updateStudent } from '../Controller/studentController.js'

const student_router = express.Router()


student_router.post('/addstudent',addStudent)
student_router.get('/liststudent',listStudent)
student_router.put('/update/:id',updateStudent)
student_router.delete('/delete/:id',deleteStudent)
student_router.get('/fetchdata/:id',fetchStudentData)
student_router.get('/fetchmarks/:id',fetchStudentsMark)
student_router.post('/addmarks/:id',addMarks)

export default student_router