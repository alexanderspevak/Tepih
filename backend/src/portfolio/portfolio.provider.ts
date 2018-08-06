'use strict';

import { Module, RequestMethod } from '@nestjs/common';

import {
    Manufacturer,
    Customer,
    OrderItem,
    Order,
    Product,
    Admin
} from '../../models';

export const ManufacturerProvider = {
    provide: 'ManufacturerRepository',
    useValue: Manufacturer,
};

export const CustomerProvider = {
    provide: 'CustomerRepository',
    useValue: Customer,
};

export const OrderItemProvider = {
    provide: 'OrderItemRepository',
    useValue: OrderItem,
};

export const OrderProvider = {
    provide: 'OrderRepository',
    useValue: Order,
};

export const ProductProvider = {
    provide: 'ProductRepository',
    useValue: Product,
};

export const AdminProvider={
    provide:'AdminRepository',
    useValue:Admin
}