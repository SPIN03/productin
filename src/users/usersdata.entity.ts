  
import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class productdata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku_code: string

    @Column()
    sku_name: string

    @Column()
    owner_product: string

    @Column()
    quantity: number
    
    @OneToMany(type => producthis, producthis => producthis.id_product)
    producthis: producthis[];
}

@Entity()
export class producthis extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_product:number

    @Column()
    quantity_up: number

    @ManyToOne(type => productdata, productdata => productdata.id)
    productdata : productdata;
}


