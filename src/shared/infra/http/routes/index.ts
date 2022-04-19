import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use("/cars", carsRoutes)
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use(authenticateRoutes);

export { router };
