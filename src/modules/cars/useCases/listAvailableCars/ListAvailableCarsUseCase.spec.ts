import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available name', async () => {
    const carName = 'Car 1';
    const createdCar = await carsRepositoryInMemory.create({
      name: carName,
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-12345',
      fine_amount: 40,
      brand: 'Audi',
      category_id: '7a4c76ba-4201-4d9f-bef7-1d8760221e0b',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: carName,
    });

    expect(cars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by brand', async () => {
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

    const cars = await listAvailableCarsUseCase.execute({
      brand: carBrand,
    });

    expect(cars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by category', async () => {
    const categoryId = '7a4c76ba-4201-4d9f-bef7-1d8760221e0b';
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: categoryId,
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: categoryId,
    });

    expect(cars).toEqual([createdCar]);
  });
});
