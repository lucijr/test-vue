import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import ICustomer from '../entities/ICustomer';

export default interface ICustomersRespository {
  create(data: ICreateCustomerDTO): Promise<ICustomer>;
  update(data: ICustomer): Promise<ICustomer>;
  delete(data: ICustomer): Promise<void | undefined>;
  findAll(): Promise<ICustomer[] | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
}
