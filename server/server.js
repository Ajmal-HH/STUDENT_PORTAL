import express from 'express'
import cors from 'cors'
import student_router from './Router/studentRouter.js';

const app = express();

const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())



app.use('/',student_router)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 