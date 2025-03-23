import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { saleBody } from "./constants";
import Helpers from '../shared/helpers';

@Injectable()
export class SalesService {
    validateBody(body: saleBody) {
        const {
            date,
            invoiceId,
            itemId,
            cost,
            taxRate
        } = body;
        
        // Validate date
        if (!Helpers.isDateValid(date))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate invoiceId
        if (!Helpers.isGUIDValid(invoiceId))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate ItemId
        if (!Helpers.isGUIDValid(itemId))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate Cost
        if (Helpers.isCostValid(cost))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate Tax
        if (Helpers.isTaxValid(taxRate))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        return {
            date: new Date(date),
            invoiceId,
            itemId,
            cost,
            taxRate
        }
    }

    updateSale(body: saleBody) {
        const {
            date,
            invoiceId,
            itemId,
            cost,
            taxRate
        } = this.validateBody(body);
    }
}
