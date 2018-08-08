import { Module, Next } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import {PortfolioModule} from './portfolio/portfolio.module';
import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class AuthModule implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction{
        return (req, res, next) => {
            console.log('what is req', req.headers.authentication);
            next();
        };
    }

}