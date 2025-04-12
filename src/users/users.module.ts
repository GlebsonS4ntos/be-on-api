import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [{
    provide: 'IUserService',
    useClass: UsersService
  }]
  
})
export class UsersModule {}
