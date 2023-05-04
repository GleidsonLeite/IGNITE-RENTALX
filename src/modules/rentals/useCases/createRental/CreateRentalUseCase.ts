import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepositories';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_data: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}

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

    const dateNow = this.dateProvider.dateNow();

    const compareInHours = this.dateProvider.compareInHours(
      dateNow,
      expected_return_data,
    );

    const minimumHour = 24;

    if (compareInHours < minimumHour) {
      throw new AppError('Invalid return time!');
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
