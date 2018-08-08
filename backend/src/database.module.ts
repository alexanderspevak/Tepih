import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import {PortfolioModule} from './portfolio/portfolio.module';

@Module({

    components: [databaseProvider],
    exports: [databaseProvider],
})
export class DatabaseModule {}