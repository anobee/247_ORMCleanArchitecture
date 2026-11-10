import dotenv from 'dotenv';
import express from 'express';
import connectDataBase from './config/db.js';
import komikRoutes from './routes/komikRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic CORS support agar API bisa diakses dari frontend client/browser
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Root endpoint (Health-check & API directory)
app.get('/', (req, res) => {
    res.json({
        message: 'API Komik (ORM Clean Architecture) is running',
        endpoints: {
            getAllKomik: 'GET /api/komik',
            getKomikById: 'GET /api/komik/:id',
            createKomik: 'POST /api/komik',
            updateKomik: 'PUT /api/komik/:id',
            deleteKomik: 'DELETE /api/komik/:id',
        }
    });
});

// Routes utama: /api/komik (dan alias /komik untuk backward compatibility)
app.use('/api/komik', komikRoutes);
app.use('/komik', komikRoutes);

// 404 Handler untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`
    });
});

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
