import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ UsersModule,TypeOrmModule.forRoot(orm_config)],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
