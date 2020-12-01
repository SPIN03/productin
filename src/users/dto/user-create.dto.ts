import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    sku_code: string;

    @IsString()
    @IsNotEmpty()
    sku_name: string;

    @IsString()
    @IsNotEmpty()
    owner_product:string;

          
    @IsNumber()
    @IsNotEmpty()
    quantity:number;

    // @IsString()
    // @IsOptional()
    // email:string
}