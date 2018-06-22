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
import {Product} from './product';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'Manufacturers' } as IDefineOptions;

@Table(tableOptions)
export class Manufacturer extends Model<Manufacturer> {
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

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @HasMany(() => Product)
    public Product: Product[];
}
