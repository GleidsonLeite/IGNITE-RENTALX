import { Request, Response, Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/ListCategories';

const categoriesRouter = Router();

categoriesRouter.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRouter };
