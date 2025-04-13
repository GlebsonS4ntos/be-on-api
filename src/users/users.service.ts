import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReadUserDto } from './dtos/readUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findUserByIdAsync(id: number): Promise<ReadUserDto> {
        const user = await this.userRepository.findOne({where: {id}});

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email
        } as ReadUserDto;
    }

    async findUserByEmailAsync(email: string): Promise<ReadUserDto> {
        const user = await this.userRepository.findOne({where: {email}});

        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        return {
            id: user.id,
            name: user.name,
            email: user.email
        } as ReadUserDto;
    }

    async createUserAsync(createUserDto: CreateUserDto): Promise<ReadUserDto> {
        var passwordHash = await bycrypt.hash(createUserDto.password, 10);

        const user = await this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: passwordHash
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email
        } as ReadUserDto;
    }
    async updateUserAsync(updateUser: UpdateUserDto): Promise<void> {
        const user = await this.userRepository.findOne({where: {id: updateUser.id}});

        if (!user) {
            throw new NotFoundError('User not found');
        }

        if (updateUser.password) {
            var passwordHash = await bycrypt.hash(updateUser.password, 10);
            updateUser.password = passwordHash;

            await this.userRepository.update({id: updateUser.id}, {
                name: updateUser.name,
                email: updateUser.email,
                password: updateUser.password
            });
        }

        await this.userRepository.update({id: updateUser.id}, {
            name: updateUser.name,
            email: updateUser.email,
        });
    }
    
    async deleteUserAsync(email: string): Promise<void> {
        const user = await this.userRepository.findOne({where: {email}});

        if (!user) {
            throw new NotFoundError('User not found');
        }

        await this.userRepository.update({email}, {isDeleted: true});                   
    }
}
