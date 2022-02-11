import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use(authenticateRoutes);

export { router };
