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
import {Customer} from './customer';
import {OrderItem} from './order_item';
const tableOptions: IDefineOptions = { timestamp: true, tableName: 'Orders' } as IDefineOptions;

@Table(tableOptions)
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public customer_id: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    public delivery_date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public message: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @BelongsTo(() => Customer)
    public Customer: Customer;

    @HasMany(() => OrderItem)
    public OrderItem: OrderItem[];
}
