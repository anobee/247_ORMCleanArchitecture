import db from '../models/index.js';

async function connectDataBase() {
    try {
        await db.sequelize.authenticate();
        console.log('Koneksi database berhasil.');

        // Sinkronisasi model ke tabel (membuat tabel jika belum ada)
        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Koneksi database gagal:', error.name, error.message || error.parent?.message || error);
        throw error;
    }
}

export default connectDataBase;
