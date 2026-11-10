import dotenv from 'dotenv';
import express from 'express';
import connectDataBase from './config/db.js';
import komikRoutes from './routes/komikRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'API Komik (ORM Clean Architecture) is running',
        endpoints: {
            getAllKomik: 'GET /komik',
            getKomikById: 'GET /komik/:id',
            createKomik: 'POST /komik',
            updateKomik: 'PUT /komik/:id',
            deleteKomik: 'DELETE /komik/:id',
        }
    });
});

app.use('/komik', komikRoutes);

async function startServer() {
    try {
        await connectDataBase();
    } catch (error) {
        console.warn('Peringatan: Gagal terhubung ke database.');
        console.warn('Detail:', error.name, error.message || error.parent?.message || '');
        console.warn('Pastikan service PostgreSQL telah aktif dan database "perpustakaan" sudah dibuat.');
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
