const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const UserRouter = require('./routes/UserRoutes');
const AdminRouter = require('./routes/AdminRoutes');
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// cb means callback



app.use('/user',UserRouter)
app.use('/admin',AdminRouter)



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });