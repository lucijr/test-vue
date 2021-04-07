import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICustomersRespository from '../repositories/ICustomersRepository';
import ICustomer from '../entities/ICustomer';

interface IRequest {
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
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRespository,
  ) {}

  public async execute({
    name,
    email,
    cep,
    street,
    city,
    complement,
    district,
    uf,
  }: IRequest): Promise<ICustomer> {
    const checkCustomersExists = await this.customersRepository.findByEmail(
      email,
    );

    if (checkCustomersExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
      cep,
      street,
      city,
      complement,
      district,
      uf,
    });

    return customer;
  }
}
export default CreateCustomerService;
