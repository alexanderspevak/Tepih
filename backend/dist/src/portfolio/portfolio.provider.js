'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
exports.ManufacturerProvider = {
    provide: 'ManufacturerRepository',
    useValue: models_1.Manufacturer,
};
exports.CustomerProvider = {
    provide: 'CustomerRepository',
    useValue: models_1.Customer,
};
exports.OrderItemProvider = {
    provide: 'OrderItemRepository',
    useValue: models_1.OrderItem,
};
exports.OrderProvider = {
    provide: 'OrderRepository',
    useValue: models_1.Order,
};
exports.ProductProvider = {
    provide: 'ProductRepository',
    useValue: models_1.Product,
};
//# sourceMappingURL=portfolio.provider.js.map