import { Module, RequestMethod } from '@nestjs/common';
import {
    ManufacturerProvider,
    OrderItemProvider,
    OrderProvider,
    CustomerProvider,
    ProductProvider,
    AdminProvider
} from './portfolio.provider';

import {ManufacturerResolver} from './manufacturer/manufacturer';
import {ProductResolver} from './product/product';
import {CustomerResolver} from './customer/customer';
import {OrderResolver} from './order/order';
import {OrderItemResolver} from './orderItem/orderItem';
import {HigherOrderResolver} from './higherOrderResolvers/higherOrderResolvers';
import {AdminResolver} from './admin/admin';

@Module({
    components: [
        ManufacturerProvider,
        OrderItemProvider,
        OrderProvider,
        CustomerProvider,
        ProductProvider,
        ManufacturerResolver,
        ProductResolver,
        CustomerResolver,
        OrderResolver,
        OrderItemResolver,
        HigherOrderResolver,
        AdminResolver,
        AdminProvider
    ],
    exports: [
        ManufacturerProvider,
        OrderItemProvider,
        OrderProvider,
        CustomerProvider,
        ProductProvider,
        ManufacturerResolver,
        ProductResolver,
        HigherOrderResolver,
        AdminResolver,
        AdminProvider
    ],
})
export class PortfolioModule {}