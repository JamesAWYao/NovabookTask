import { Patch } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sale')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Patch()
  updateSale(): string {
    return 'sales';
  }
}
