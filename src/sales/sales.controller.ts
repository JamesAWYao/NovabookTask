import { Patch } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Patch()
  getHello(): string {
    return 'sales';
  }
}
