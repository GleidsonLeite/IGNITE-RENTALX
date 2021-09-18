import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create(data: ICreateUserDTO): Promise<void> {
    const newUser = new User();
    Object.assign(newUser, data);
    this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser = this.users.find(user => user.email === email);
    return foundUser;
  }

  async findById(id: string): Promise<User> {
    const foundUser = this.users.find(user => user.id === id);
    return foundUser;
  }
}

export { UsersRepositoryInMemory };
