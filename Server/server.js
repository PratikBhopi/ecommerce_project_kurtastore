const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3000


const AdminAuthRouter = require('./routes/admin/AdminAuthRoutes');
const AdminProductRouter = require('./routes/admin/AdminProductRoutes');
const AdminOrderRouter = require('./routes/admin/AdminOrderRoutes');
const AdminUserRouter = require('./routes/admin/AdminUserRoutes');

const UserAuthRouter = require('./routes/user/UserAuthRoutes');
const UserCartRouter = require('./routes/user/UserCartRoutes');
const UserProductRouter = require('./routes/user/UserProductRoutes');
const UserOrderPaymentRouter = require('./routes/user/UserOrderPaymentRoutes');
const UserOTPRouter = require('./routes/user/UserOTPRoutes');
const UserContactRouter = require('./routes/user/UserContactRoutes');




app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.use('/user',UserAuthRouter)
app.use('/user',UserCartRouter)
app.use('/user',UserProductRouter)
app.use('/user',UserOrderPaymentRouter)
app.use('/user',UserOTPRouter)
app.use('/user',UserContactRouter)

app.use('/admin', AdminAuthRouter)
app.use('/admin', AdminProductRouter)
app.use('/admin', AdminOrderRouter)
app.use('/admin', AdminUserRouter)


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });