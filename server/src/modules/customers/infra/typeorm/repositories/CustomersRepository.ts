import { getRepository, Repository } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    const findCustomers = await this.ormRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });

    return findCustomers;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = await this.ormRepository.findOne(id);

    return findCustomer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findCustomer = await this.ormRepository.findOne({
      where: { email },
    });

    return findCustomer;
  }

  public async create({
    name,
    email,
    cep,
    city,
    complement,
    district,
    street,
    uf,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.ormRepository.create({
      name,
      email,
      cep,
      city,
      complement,
      district,
      street,
      uf,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async update(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async delete(customer: Customer): Promise<void | undefined> {
    this.ormRepository.remove(customer);
  }
}

export default CustomersRepository;
