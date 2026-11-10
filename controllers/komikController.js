const db require('../config/models');\

async function getAllKomik(req, res) {
    try {
        const komiks = await db.Komik.findAll();
        res.json(komiks);
    } catch (error) {
        console.error('Error fetching komiks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.json(komik);
    } catch (error) {
        console.error('Error fetching komik:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createKomik(req, res) {
    const { title, description, author } = req.body;
    try {
        const newKomik = await db.Komik.create({ title, description, author });
        res.status(201).json(newKomik);
    } catch (error) {
        console.error('Error creating komik:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}