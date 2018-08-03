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
import {Order} from './order';
import {Product} from './product';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'Order_items' } as IDefineOptions;

@Table(tableOptions)
export class OrderItem extends Model<OrderItem> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public product_id: number;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public order_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public quantity: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public size: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public ammount: number;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @BelongsTo(() => Order)
    public Order: Order;

    @BelongsTo(() => Product)
    public Product: Product;
}
