import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request: Request, response: Response) => {
  const categories = categoriesRepository.list();
  return response.status(200).json({ categories });
});

export { categoriesRouter };
