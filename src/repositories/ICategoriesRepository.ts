import { Category } from '../model/Category';

// DTO => Data Transfer Object

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ description, name }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
