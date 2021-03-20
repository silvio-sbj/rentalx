import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationUserCase } from './CreateSpecificationUserCase';
import { CreateSpecificationController } from './CreateSpecificationController';

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationUserCase = new CreateSpecificationUserCase(
  specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUserCase
);

export { createSpecificationController };
