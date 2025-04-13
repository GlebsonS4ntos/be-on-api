import { Body, Controller, Delete, Get, Header, Inject, Param, Post, Put } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReadUserDto } from './dtos/readUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('IUserService')
        private readonly usersService: IUserService
    ) {}

    @Post()
    async createUserAsync(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
        return await this.usersService.createUserAsync(createUserDto);
    }

    @Get(':id')
    async findUserByIdAsync(@Param('id') id: number): Promise<ReadUserDto> {
        return await this.usersService.findUserByIdAsync(id);
    }

    @Delete(':email')
    async deleteUserAsync(@Param('email') email: string): Promise<void> {
        return await this.usersService.deleteUserAsync(email);
    }

    @Put(':id')
    async updateUserAsync(@Param('id') id: number, @Body() updateUser: UpdateUserDto): Promise<void> {
        return await this.usersService.updateUserAsync(updateUser);
    }
}
