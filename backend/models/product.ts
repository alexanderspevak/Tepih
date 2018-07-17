import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    BeforeCreate,
    BelongsTo,
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';

import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import {Manufacturer} from './manufacturer';
import {OrderItem} from './order_item';
const tableOptions: IDefineOptions = { timestamp: true, tableName: 'Products' } as IDefineOptions;

@Table(tableOptions)
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name: string;

    @ForeignKey(() => Manufacturer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public manufacturer_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public type: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public size: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public color: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public price: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate:{
            fn:function(val){
                console.log('what is val',val)
                if(val=='mera' || val=='m2' || val=='m3'||val=='m'){   
                    console.log('logis is problem')
                    return this;
       
                }
                console.log('throwww')
                throw new Error('valid units are m2, m3 or mera')
            }
        }
    })
    public unit: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public pic: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @BelongsTo(() => Manufacturer)
    public Manufacturer: Manufacturer;

    @HasMany(() => OrderItem,{onDelete:'cascade'})
    public OrderItem: OrderItem[];
}
