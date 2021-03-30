import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUserCase } from './CreateSpecificationUserCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUserCase = container.resolve(
      CreateSpecificationUserCase
    );

    await createSpecificationUserCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
