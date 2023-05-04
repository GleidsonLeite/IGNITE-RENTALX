import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepositories';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_data: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_data,
    user_id,
  }: IRequest): Promise<Rental> {
    const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (unavailableCar) {
      throw new AppError('Car is unavailable!');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError(`There's a rental in progress for user`);
    }

    const createdRental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_data,
    });

    return createdRental;
  }
}

export { CreateRentalUseCase };
