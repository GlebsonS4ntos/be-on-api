import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReadUserDto } from './dtos/readUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService implements IUserService {
    findUserByIdAsync(id: number): Promise<ReadUserDto> {
        throw new Error('Method not implemented.');
    }
    findUserByEmailAsync(email: string): Promise<ReadUserDto> {
        throw new Error('Method not implemented.');
    }
    createUserAsync(createUserDto: CreateUserDto): Promise<ReadUserDto> {
        throw new Error('Method not implemented.');
    }
    updateUserAsync(updateUser: UpdateUserDto): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteUserAsync(email: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
