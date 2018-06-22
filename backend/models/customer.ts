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

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'Customers' } as IDefineOptions;

@Table(tableOptions)
export class Customer extends Model<Customer> {
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public city: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @HasMany(() => Order)
    public Order: Order[];
}
