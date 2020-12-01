import { EntityRepository, Repository } from "typeorm";
import { productdata } from "./usersdata.entity";

@EntityRepository(productdata)
export class UserRepository extends Repository<productdata> {}


