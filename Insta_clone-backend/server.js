const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./dbConnect');




// configure dot ENV
dotenv.config();



const app = express();
const port = process.env.port || 4000;



app.use(cors());
app.use(express.json());
app.use('/api/v1/user', require('./routes/user_route'));
app.use('/api/v1/auth', require('./routes/auth_route'));
app.use('/api/v1/post', require('./routes/posts_route'));






app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});