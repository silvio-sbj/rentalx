import { Request, Response } from 'express';
import { CreateSpecificationUserCase } from './CreateSpecificationUserCase';

class CreateSpecificationController {
  constructor(
    private createSpecificationUserCase: CreateSpecificationUserCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUserCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
