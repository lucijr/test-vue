import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICustomersRespository from '../repositories/ICustomersRepository';
import ICustomer from '../entities/ICustomer';

@injectable()
class GetAllCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customer = await this.customersRepository.findAll();

    return customer;
  }
}
export default GetAllCustomerService;
