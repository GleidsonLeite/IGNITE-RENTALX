import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const foundCar = await this.repository.findOne({ license_plate });
    return foundCar;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });
    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    const foundCars = await carsQuery.getMany();
    return foundCars;
  }

  async findById(id: string): Promise<Car> {
    const foundCar = await this.repository.findOne(id);
    return foundCar;
  }
}

export { CarsRepository };
