import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionUseCase } from './DevolutionRentalUseCase';

class DevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionUseCase = container.resolve(DevolutionUseCase);

    const rental = await devolutionUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionController };
