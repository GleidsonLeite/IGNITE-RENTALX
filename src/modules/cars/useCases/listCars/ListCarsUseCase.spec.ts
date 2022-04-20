import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Audi',
      category_id: '7a4c76ba-4201-4d9f-bef7-1d8760221e0b',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by name', async () => {
    const carBrand = 'Car_brand_test';
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: carBrand,
      category_id: '7a4c76ba-4201-4d9f-bef7-1d8760221e0b',
    });

    const cars = await listCarsUseCase.execute({
      brand: carBrand,
    });

    expect(cars).toEqual([createdCar]);
  });
});
