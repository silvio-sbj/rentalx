import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionController = new DevolutionController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionController.handle
);

export { rentalsRoutes };
