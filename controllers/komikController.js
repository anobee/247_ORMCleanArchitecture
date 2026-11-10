import db from '../models/index.js';

// Membungkus handler async agar error dicatat dan dikembalikan secara konsisten
const handle = (label, fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        console.error(`Error ${label}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Ambil hanya field yang dikirim, agar field yang kosong tidak menimpa data lama
const pickDefined = (source, fields) =>
    fields.reduce((acc, key) => {
        if (source[key] !== undefined) acc[key] = source[key];
        return acc;
    }, {});

const FIELDS = ['title', 'description', 'author'];

const getAllKomik = handle('fetching komiks', async (req, res) => {
    // Pagination: ?page=1&limit=20 (limit maksimal 100)
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Komik.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']],
    });

    res.json({
        data: rows,
        pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
    });
});

const getKomikById = handle('fetching komik', async (req, res) => {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) {
        return res.status(404).json({ error: 'Komik not found' });
    }
    res.json(komik);
});

const createKomik = handle('creating komik', async (req, res) => {
    const data = pickDefined(req.body, FIELDS);

    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newKomik = await db.Komik.create(data);
    res.status(201).json(newKomik);
});

const updateKomik = handle('updating komik', async (req, res) => {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) {
        return res.status(404).json({ error: 'Komik not found' });
    }

    const data = pickDefined(req.body, FIELDS);

    if ('title' in data && (typeof data.title !== 'string' || !data.title.trim())) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    await komik.update(data);
    res.status(200).json(komik);
});

const deleteKomik = handle('deleting komik', async (req, res) => {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) {
        return res.status(404).json({ error: 'Komik not found' });
    }

    await komik.destroy();
    res.status(200).json({ message: 'Komik deleted successfully' });
});

export {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik,
};
