// import { Request, Response } from 'express';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import GetAllCustomerService from '@modules/customers/services/GetAllCustomerService';
import GetCustomerService from '@modules/customers/services/GetCustomerService';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cep,
      street,
      city,
      complement,
      district,
      uf,
    } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({
      name,
      email,
      cep,
      street,
      city,
      complement,
      district,
      uf,
    });
    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({ userId });

    return response.json({ delete: 'ok' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;
    const {
      id = userId,
      name,
      email,
      cep,
      street,
      city,
      complement,
      district,
      uf,
    } = request.body;

    const updateCustomerService = container.resolve(UpdateCustomerService);

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
      cep,
      street,
      city,
      complement,
      district,
      uf,
    });

    return response.json(customer);
  }

  public async getAll(
    _request: unknown,
    response: Response,
  ): Promise<Response> {
    const getAllCustomerService = container.resolve(GetAllCustomerService);

    const customer = await getAllCustomerService.execute();

    return response.json(customer);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const getCustomerService = container.resolve(GetCustomerService);

    const customer = await getCustomerService.execute({ userId });

    return response.json(customer);
  }
}
