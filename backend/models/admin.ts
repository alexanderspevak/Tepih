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

const tableOptions: IDefineOptions = { tableName: 'Admin' } as IDefineOptions;

@Table(tableOptions)
export class Admin extends Model<Admin> {
    @Column({
        primaryKey:true,
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    public login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public password: string;
}
