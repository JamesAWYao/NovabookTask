import { Get, Query } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { TaxService } from './tax.service';

@Controller('tax-position')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get('')
  queryTaxPosition(@Query('date') date: string): void {
    this.taxService.queryTaxPosition(date);
  }
}

