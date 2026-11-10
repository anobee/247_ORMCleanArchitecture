const express = require('express');
const router = express.Router();
const komikController = require('../controllers/komikController');

const {
    komikSchema, IdSchema, validateBody, validateParams
} = require('../middleware/komikValidator');

router.get('/', komikController.getAllKomik);
router.get('/:id', validateParams(IdSchema), komikController.getKomikById);
router.post('/', validateBody(komikSchema), komikController.createKomik);
router.put('/:id', validateParams(IdSchema), validateBody(komikSchema), komikController.updateKomik);
router.delete('/:id', validateParams(IdSchema), komikController.deleteKomik);


module.exports = router;