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
var _a;
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_entity_1 = require("./customer.entity");
const tableOptions = { timestamp: true, tableName: 'customers' };
let Order = class Order extends sequelize_typescript_1.Model {
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
], Order.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => customer_entity_1.default),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "surnaname", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", Date)
], Order.prototype, "deletedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => customer_entity_1.default),
    __metadata("design:type", typeof (_a = typeof customer_entity_1.default !== "undefined" && customer_entity_1.default) === "function" && _a || Object)
], Order.prototype, "Customer", void 0);
Order = __decorate([
    sequelize_typescript_1.Table(tableOptions)
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map