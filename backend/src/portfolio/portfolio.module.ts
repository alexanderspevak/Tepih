import { Module, RequestMethod } from '@nestjs/common';
import {
    ManufacturerProvider,
    OrderItemProvider,
    OrderProvider,
    CustomerProvider,
    ProductProvider,
} from './portfolio.provider';

import {ManufacturerResolver} from './manufacturer/manufacturer';
import {ProductResolver} from './product/product';
import {CustomerResolver} from './customer/customer';
import {OrderResolver} from './order/order';
import {OrderItemResolver} from './orderItem/orderItem';

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
    ],
    exports: [
        ManufacturerProvider,
        OrderItemProvider,
        OrderProvider,
        CustomerProvider,
        ProductProvider,
        ManufacturerResolver,
        ProductResolver,
    ],
})
export class PortfolioModule {}