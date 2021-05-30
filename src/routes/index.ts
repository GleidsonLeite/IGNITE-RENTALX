import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);

export { router };
