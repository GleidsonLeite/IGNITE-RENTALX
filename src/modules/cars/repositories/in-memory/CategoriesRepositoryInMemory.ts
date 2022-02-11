import { Category } from '../../infra/typeorm/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const foundCategory = this.categories.find(
      category => category.name === name,
    );
    return foundCategory;
  }

  async list(): Promise<Category[]> {
    const categoriesList = this.categories;
    return categoriesList;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
