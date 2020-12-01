import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRepository } from './user.repository';
import { productdata, producthis } from './usersdata.entity';


// const USER_DATA: any = [
//   { id: 1, sku_code: '0000', sku_name: 'mouse', owner_product: 'mike' ,quantity:1},
// ];

@Injectable()
export class UsersService {
  constructor(private readonly user: UserRepository) { }
  async getUser() {
    try {
      const data = await this.user.find()
      if (!data) throw new Error('no data');  
      return data
    } catch (error) {
      throw new NotFoundException({
        success: false,
        message: error.message,
      });
    }
  }
 
  async addUser(body: UserCreateDto) {
               
    try {  
      const sku_c = new productdata();
      const pdt = new producthis();
      const { sku_code, sku_name,owner_product,quantity} = body;
       const skuid = await this.user.findOne({where:{sku_code:sku_code}})
      // const skuid = this.user.query("select")
       if (skuid) throw new Error('มีรหัสสินค้าซ้ำ.');
        
      sku_c.sku_code = sku_code
      sku_c.sku_name = sku_name
      sku_c.owner_product = owner_product
      sku_c.quantity = quantity  
      await sku_c.save()
      pdt.id_product = sku_c.id
      pdt.quantity_up = quantity
      await pdt.save() 
      // const find = USER_DATA.find(e => e.sku_code === sku_code);

      return {
        success: true,
        message: 'add success.',
      };

    } catch (error) {
      
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    
  }}

  async updateda(data,a,b){
    await getConnection()
    .createQueryBuilder()
    .update(data)
    .set(
     a
    )
    .where("id = :id", { id: b })
    .execute();
  }

  async update(id:number, body: UserCreateDto) {
    try {
      const pdt = new producthis();  
      const { sku_code, sku_name ,quantity} = body;
      const find = await this.user.findOne({where:{id:id}})
      // const find = USER_DATA.find(e => e.id == id);
      
      if (!find) throw new Error('not found.');
      if(find.quantity +quantity < 0) throw new Error('สินค้าไม่พอ');
      // console.log(sku_c)
       const a ={ quantity: find.quantity+quantity,
                  sku_code:sku_code,
                  sku_name:sku_name
      }
      
       this.updateda(productdata,a,id)
       pdt.id_product = find.id
       pdt.quantity_up = quantity
       await pdt.save()

       
      //  sku_c.quantity = sku_c.quantity + quantity 
      //  sku_c.sku_code = sku_code
      //  sku_c.sku_name =sku_name  
      //  await sku_c.save()
      //  pdt.id_product = sku_c.id
      //  pdt.quantity_up = quantity
      //  await pdt.save() 
      //  find.sku_code = sku_code;
      //  find.sku_name = sku_name;
      //  find.quantity = find.quantity + quantity;
      return {
        success: true,
        message: 'updated success.',
        data :productdata
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }

  async deleted(dataa,id){
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(dataa)
    .where("id = :id", { id:id })
    .execute();
  }

  async delete(id:number){
    try{ 
    const find = await this.user.findOne({where:{id:id}})
    if (!find) throw new Error('id not found.');
      
      this.deleted(productdata,id)
     await getConnection()
     .createQueryBuilder()
     .delete()
     .from(producthis)
     .where("id_product = :id_product", { id_product:id })
     .execute();
    
     return {
      success: true,
      message: 'delete success.'
    };


    }catch(error){
      throw new BadRequestException({
        success: false,
        message: error.message,
      });

    }
    

  }
}
