import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { TaxModule } from './tax/tax.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [TransactionsModule, TaxModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
