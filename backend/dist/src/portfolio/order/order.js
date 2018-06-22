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
let OrderResolver = class OrderResolver {
    constructor(customer, order, orderItem) {
        this.customer = customer;
        this.order = order;
        this.orderItem = orderItem;
    }
    getOrders(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.order.findAll({
                include: [
                    { model: this.customer, as: 'Customer' },
                    { model: this.orderItem, as: 'OrderItem' },
                ],
            });
            return orders;
        });
    }
    getOrder(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.order.findById(args.id, {
                include: [
                    { model: this.customer, as: 'Customer' },
                    { model: this.orderItem, as: 'OrderItem' },
                ],
            });
        });
    }
    deleteOrder(obj, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.order.destroy({
                where: { id: args.id },
            });
        });
    }
    createOrder(obj, { input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.order.create(input);
            return order;
        });
    }
    updateOrder(obj, { input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.order.upsert(input);
        });
    }
};
__decorate([
    graphql_1.Query('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrders", null);
__decorate([
    graphql_1.Query('order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrder", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "deleteOrder", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "updateOrder", null);
OrderResolver = __decorate([
    graphql_1.Resolver(),
    __param(0, common_1.Inject('CustomerRepository')),
    __param(1, common_1.Inject('OrderRepository')),
    __param(2, common_1.Inject('OrderItemRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.js.map