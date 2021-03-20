import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUserCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const alreadyExists = this.specificationRepository.findByName(name);
    if (alreadyExists) {
      throw new Error('Specification already exists!');
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUserCase };
