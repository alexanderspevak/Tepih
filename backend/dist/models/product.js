"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const manufacturer_1 = require("./manufacturer");
const order_item_1 = require("./order_item");
const tableOptions = { timestamp: true, tableName: 'Products' };
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => manufacturer_1.Manufacturer),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "manufacturer_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        validate: {
            fn: function (val) {
                console.log('what is val', val);
                if (val == 'pc' || val == 'm2' || val == 'm3' || val == 'm') {
                    console.log('logis is problem');
                    return this;
                }
                console.log('throwww');
                throw new Error('valid units are m2, m3 or pc');
            }
        }
    }),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "pic", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => manufacturer_1.Manufacturer),
    __metadata("design:type", manufacturer_1.Manufacturer)
], Product.prototype, "Manufacturer", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => order_item_1.OrderItem, { onDelete: 'cascade' }),
    __metadata("design:type", Array)
], Product.prototype, "OrderItem", void 0);
Product = __decorate([
    sequelize_typescript_1.Table(tableOptions)
], Product);
exports.Product = Product;
//# sourceMappingURL=product.js.map