import { Router } from 'express';

import customerRouter from '@modules/customers/infra/http/routes/customers.routes';

const routes = Router();

routes.use('/api/customers', customerRouter);

export default routes;
