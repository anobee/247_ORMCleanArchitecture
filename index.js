import dotenv from 'dotenv';
import express from 'express';
import connectDataBase from './config/db.js';
import komikRoutes from './routes/komikRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/komik', komikRoutes);

async function startServer() {
    try {
        await connectDataBase();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Gagal menjalankan server:', error);
    }
}

startServer();