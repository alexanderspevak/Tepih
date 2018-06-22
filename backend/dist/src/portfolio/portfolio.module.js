"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const portfolio_provider_1 = require("./portfolio.provider");
const manufacturer_1 = require("./manufacturer/manufacturer");
const product_1 = require("./product/product");
const customer_1 = require("./customer/customer");
const order_1 = require("./order/order");
const orderItem_1 = require("./orderItem/orderItem");
let PortfolioModule = class PortfolioModule {
};
PortfolioModule = __decorate([
    common_1.Module({
        components: [
            portfolio_provider_1.ManufacturerProvider,
            portfolio_provider_1.OrderItemProvider,
            portfolio_provider_1.OrderProvider,
            portfolio_provider_1.CustomerProvider,
            portfolio_provider_1.ProductProvider,
            manufacturer_1.ManufacturerResolver,
            product_1.ProductResolver,
            customer_1.CustomerResolver,
            order_1.OrderResolver,
            orderItem_1.OrderItemResolver,
        ],
        exports: [
            portfolio_provider_1.ManufacturerProvider,
            portfolio_provider_1.OrderItemProvider,
            portfolio_provider_1.OrderProvider,
            portfolio_provider_1.CustomerProvider,
            portfolio_provider_1.ProductProvider,
            manufacturer_1.ManufacturerResolver,
            product_1.ProductResolver,
        ],
    })
], PortfolioModule);
exports.PortfolioModule = PortfolioModule;
//# sourceMappingURL=portfolio.module.js.map