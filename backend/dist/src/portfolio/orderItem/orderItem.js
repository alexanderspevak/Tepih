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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
let OrderItemResolver = class OrderItemResolver {
    constructor(product, order, orderItem, customer, manufacturer) {
        this.product = product;
        this.order = order;
        this.orderItem = orderItem;
        this.customer = customer;
        this.manufacturer = manufacturer;
    }
    getOrderItems(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = yield this.orderItem.findAll({
                include: [
                    { model: this.order, as: 'Order', include: [
                            { model: this.customer, as: 'Customer' },
                        ] },
                    { model: this.product, as: 'Product', include: [
                            { model: this.manufacturer, as: 'Manufacturer' },
                        ] },
                ],
            });
            return orderItems;
        });
    }
    getOrderItem(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderItem.findById(args.id, {
                include: [
                    { model: this.order, as: 'Order', include: [
                            { model: this.customer, as: 'Customer' },
                        ] },
                    { model: this.product, as: 'Product', include: [
                            { model: this.manufacturer, as: 'Manufacturer' },
                        ] },
                ],
            });
        });
    }
    deleteOrderItem(obj, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderItem.destroy({
                where: { id: args.id },
            });
        });
    }
    createOrderItem(obj, { input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield this.orderItem.create(input);
            return orderItem;
        });
    }
    updateOrderItem(obj, { input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderItem.upsert(input);
        });
    }
};
__decorate([
    graphql_1.Query('orderItems'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "getOrderItems", null);
__decorate([
    graphql_1.Query('orderItem'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "getOrderItem", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "deleteOrderItem", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "createOrderItem", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "updateOrderItem", null);
OrderItemResolver = __decorate([
    graphql_1.Resolver(),
    __param(0, common_1.Inject('ProductRepository')),
    __param(1, common_1.Inject('OrderRepository')),
    __param(2, common_1.Inject('OrderItemRepository')),
    __param(3, common_1.Inject('CustomerRepository')),
    __param(4, common_1.Inject('ManufacturerRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], OrderItemResolver);
exports.OrderItemResolver = OrderItemResolver;
//# sourceMappingURL=orderItem.js.map