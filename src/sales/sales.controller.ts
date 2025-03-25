import { Body, HttpCode, Patch } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { SalesService } from './sales.service';
import { saleBody } from "./constants";

@Controller('sale')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Patch()
  @HttpCode(202)
  updateSale(@Body() body: saleBody): void {
    this.salesService.updateSale(body);
  }
}
