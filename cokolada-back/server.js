const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);

connectDb();

app.listen(8000, () => {
    console.log("Server started on port 8000")
})
