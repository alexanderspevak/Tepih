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
const order_1 = require("./order");
const product_1 = require("./product");
const tableOptions = { timestamp: true, tableName: 'Order_items' };
let OrderItem = class OrderItem extends sequelize_typescript_1.Model {
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
], OrderItem.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => product_1.Product),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "product_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => order_1.Order),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "order_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OrderItem.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OrderItem.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], OrderItem.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], OrderItem.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => order_1.Order),
    __metadata("design:type", order_1.Order)
], OrderItem.prototype, "Order", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => product_1.Product),
    __metadata("design:type", product_1.Product)
], OrderItem.prototype, "Product", void 0);
OrderItem = __decorate([
    sequelize_typescript_1.Table(tableOptions)
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=order_item.js.map