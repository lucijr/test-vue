import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICustomersRespository from '../repositories/ICustomersRepository';

interface IRequest {
  userId: string;
}
@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository,
  ) {}

  public async execute({ userId }: IRequest): Promise<void | undefined> {
    const customer = await this.customersRepository.findById(userId);

    if (!customer) {
      throw new AppError('Usuário não existe.', 404);
    }

    await this.customersRepository.delete(customer);
  }
}
export default DeleteCustomerService;
