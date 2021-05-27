import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({
    name,
    description,
  });
  return response.status(201).send();
});

categoriesRouter.get('/', (request: Request, response: Response) => {
  const categories = categoriesRepository.list();
  return response.status(200).json({ categories });
});

export { categoriesRouter };
