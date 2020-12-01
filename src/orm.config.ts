import { TypeOrmModule } from "@nestjs/typeorm";


export const orm_config: TypeOrmModule = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "1987",
    "database": "pro007",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
  }