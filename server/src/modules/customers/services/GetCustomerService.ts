import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICustomersRespository from '../repositories/ICustomersRepository';
import ICustomer from '../entities/ICustomer';

interface IRequest {
  userId: string;
}

@injectable()
class GetAllCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository,
  ) {}

  public async execute({ userId }: IRequest): Promise<ICustomer | undefined> {
    const customer = await this.customersRepository.findById(userId);

    if (!customer) {
      throw new AppError('Usuário não existe.', 404);
    }

    return customer;
  }
}
export default GetAllCustomerService;
