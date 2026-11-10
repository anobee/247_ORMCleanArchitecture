import express from 'express';
import * as komikController from '../controllers/komikController.js';
import {
    komikSchema,
    updateKomikSchema,
    IdSchema,
    validateBody,
    validateParams,
} from '../middleware/komikValidator.js';

const router = express.Router();

router.get('/', komikController.getAllKomik);
router.get('/:id', validateParams(IdSchema), komikController.getKomikById);
router.post('/', validateBody(komikSchema), komikController.createKomik);
router.put('/:id', validateParams(IdSchema), validateBody(updateKomikSchema), komikController.updateKomik);
router.delete('/:id', validateParams(IdSchema), komikController.deleteKomik);

export default router;
