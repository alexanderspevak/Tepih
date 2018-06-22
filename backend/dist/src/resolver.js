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
const graphql_1 = require("@nestjs/graphql");
const models_1 = require("../models");
let ManufacturerResolver = class ManufacturerResolver {
    getManufacturer(obj, args, context, info) {
        return models_1.Manufacturer.findAll({});
    }
};
__decorate([
    graphql_1.Query('manufacturer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ManufacturerResolver.prototype, "getManufacturer", null);
ManufacturerResolver = __decorate([
    graphql_1.Resolver('Manufacturer')
], ManufacturerResolver);
exports.ManufacturerResolver = ManufacturerResolver;
//# sourceMappingURL=resolver.js.map