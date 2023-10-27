import express from 'express';
const router = express.Router();

import v1api from './v1/index.js';
import v2api from './v2/index.js';

router.use('/v1', v1api);
router.use('/v2', v2api);

export default router;
