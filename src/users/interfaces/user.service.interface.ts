import { CreateUserDto } from "../dtos/createUser.dto";
import { ReadUserDto } from "../dtos/readUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export interface IUserService {
    findUserByIdAsync(id: number): Promise<ReadUserDto>;
    findUserByEmailAsync(email: string): Promise<ReadUserDto>;
    createUserAsync(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    updateUserAsync(updateUser: UpdateUserDto): Promise<void>;
    deleteUserAsync(email: string): Promise<void>;
}