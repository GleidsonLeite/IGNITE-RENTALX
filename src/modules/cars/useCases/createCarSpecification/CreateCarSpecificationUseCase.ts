import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const foundCar = await this.carsRepository.findById(car_id);

    if (!foundCar) {
      throw new AppError('Car does not exists!');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    foundCar.specifications = specifications;

    await this.carsRepository.create(foundCar);

    return foundCar;
  }
}

export { CreateCarSpecificationUseCase };
