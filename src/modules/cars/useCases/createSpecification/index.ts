import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export default (): CreateSpecificationController => {
  const specificationsRepository = new SpecificationsRepository();
  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository,
  );
  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase,
  );
  return createSpecificationController;
};
