import { Get } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { TaxService } from './tax.service';

@Controller('tax-position')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  getHello(): string {
    return 'tax-position';
  }
}

