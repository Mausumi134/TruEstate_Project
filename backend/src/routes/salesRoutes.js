import express from 'express';
import * as salesController from '../controllers/salesController.js';

const router = express.Router();

router.get('/', salesController.getSalesData);
router.get('/filter-options', salesController.getFilterOptions);

export default router;
