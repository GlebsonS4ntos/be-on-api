import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: 'IUserService',
    useClass: UsersService
  }],
  controllers: [UsersController],
  exports: ['IUserService']
})
export class UsersModule {}
