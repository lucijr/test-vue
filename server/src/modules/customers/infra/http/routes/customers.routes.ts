import { Router } from 'express';
import 'express-async-errors';

import CustomersController from '../controllers/CustomersContoller';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post('/', customersController.create);
customersRouter.get('/', customersController.getAll);
customersRouter.get('/:userId', customersController.get);
customersRouter.put('/:userId', customersController.update);
customersRouter.delete('/:userId', customersController.delete);

export default customersRouter;
