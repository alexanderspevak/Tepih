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
let ManufacturerResolver = class ManufacturerResolver {
    constructor(manufacturer, product) {
        this.manufacturer = manufacturer;
        this.product = product;
    }
    getManufacturers(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturer.findAll({ include: [
                    { model: this.product, as: 'Product' },
                ] });
            return manufacturer;
        });
    }
    getManufacturer(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manufacturer.findById(args.id, {
                include: [{ model: this.product, as: 'Product' }],
            });
        });
    }
    deleteManufacturer(obj, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manufacturer.destroy({
                where: { id: args.id },
            });
        });
    }
    createManufacturer(obj, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturer.create({ name: args.name });
            return manufacturer;
        });
    }
    updateManufacturer(obj, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturer.upsert({
                id: args.id,
                name: args.name,
            });
        });
    }
};
__decorate([
    graphql_1.Query('manufacturers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerResolver.prototype, "getManufacturers", null);
__decorate([
    graphql_1.Query('manufacturer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerResolver.prototype, "getManufacturer", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerResolver.prototype, "deleteManufacturer", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerResolver.prototype, "createManufacturer", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerResolver.prototype, "updateManufacturer", null);
ManufacturerResolver = __decorate([
    graphql_1.Resolver(),
    __param(0, common_1.Inject('ManufacturerRepository')),
    __param(1, common_1.Inject('ProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], ManufacturerResolver);
exports.ManufacturerResolver = ManufacturerResolver;
//# sourceMappingURL=manufacturer.js.map