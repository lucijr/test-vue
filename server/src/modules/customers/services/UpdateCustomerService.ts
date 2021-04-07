import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICustomersRespository from '../repositories/ICustomersRepository';
import ICustomer from '../entities/ICustomer';

interface IRequest {
  id: string;
  name: string;
  email: string;
  cep: string;
  street: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
}
@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository,
  ) {}

  public async execute({
    id,
    name,
    email,
    cep,
    street,
    city,
    complement,
    district,
    uf,
  }: IRequest): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Usuário não existe.', 404);
    }

    customer.name = name;
    customer.email = email;
    customer.cep = cep;
    customer.street = street;
    customer.city = city;
    customer.complement = complement;
    customer.district = district;
    customer.uf = uf;

    await this.customersRepository.update(customer);

    return customer;
  }
}
export default UpdateCustomerService;
