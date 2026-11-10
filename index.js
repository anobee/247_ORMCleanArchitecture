require('dotenv').config();

const express = require('express');
const connectDataBase = require('./config/db');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/komik', require('./routes/komikRoutes'));

async function startServer() {
    await connectDataBase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
