import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userRepository from '@models/user.model';
import { isEmpty } from '@utils/util';

class UserService {

  public async findAllUser(): Promise<User[]> {
    const users = await userRepository.find();
    
    return users;
  }

  public async findUserById(userId: string): Promise<User> {

    const user = await userRepository.findOne({ id: userId })
    
    if (!user) throw new HttpException(409, "You're not user");

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");


    const findUser: User = await userRepository.findOne({ email: userData.email })
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    

    const newUser = await userRepository.create({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    });
    newUser.password = null;
  


    return newUser;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await userRepository.findOne({ id: userId })
    if (!findUser) throw new HttpException(409, "You're not user");


    const updatedUser = await userRepository.findByIdAndUpdate(userId, userData, { new: true }).exec();


    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {

    const findUser: User = await userRepository.findOne({ id: userId })
    if (!findUser) throw new HttpException(409, "You're not user");

  
    const deletedWord = await userRepository.findByIdAndDelete(userId).exec();
    return  deletedWord;
  }
}

export default UserService;
