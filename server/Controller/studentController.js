import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Student_Portal',
    password: 'ajju@123',
    port: 5432,
});

const addStudent = async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('error in addStudent :', error.message);
        res.status(500).json({ message: "This email is already exist" });
    }
}


const fetchStudentData = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        const data = result.rows

        if (data.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log('Error in fetchStudentData:', error.message);
        res.status(500).json({ error: error.message });
    }
};


const updateStudent = async (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;

    try {
        const result = await pool.query(
            'UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [name, email, age, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log('Error in updateStudent:', error.message);
        res.status(500).json({ message: "This email is already exist" });
    }
};



const listStudent = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        const data = result.rows
        res.json(data)
    } catch (error) {
        console.log("error in listStudent : ", error.message);
        res.status(500).json({ error: error.message });
    }

}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log('Error in deleteStudent:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const fetchStudentsMark = async (req, res) => {
    const { id } = req.params;
    const studentId = parseInt(id, 10);

    try {
        const studentResult = await pool.query('SELECT * FROM Students WHERE id = $1', [studentId]);
        const studentData = studentResult.rows[0];

        if (!studentData) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const marksResult = await pool.query('SELECT * FROM Marks WHERE student_id = $1', [studentId]);
        const marksData = marksResult.rows;

        const responseData = {
            student: studentData,
            marks: marksData
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.log('Error in fetchStudentMarks:', error.message);
        res.status(500).json({ error: error.message });
    }
};


const addMarks = async (req, res) => {
    const { english, maths, chemistry, physics } = req.body;
    const { id } = req.params;

    try {
        const result = await pool.query(
            'INSERT INTO Marks (student_id, english, maths, chemistry, physics) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, english, maths, chemistry, physics]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('error in addMarks:', error.message);
        res.status(500).json({ message: "An error occurred while adding marks" });
    }
};

export {
    addStudent,
    listStudent,
    updateStudent,
    deleteStudent,
    fetchStudentData,
    fetchStudentsMark,
    addMarks
}