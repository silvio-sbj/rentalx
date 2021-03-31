import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUserCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExists = await this.specificationRepository.findByName(name);
    if (alreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUserCase };
