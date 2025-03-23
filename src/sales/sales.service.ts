import { Injectable } from '@nestjs/common';
import { saleBody } from "./constants";
import Helpers from '../shared/helpers';

@Injectable()
export class SalesService {
    validateBody(body: saleBody) {
        console.log('validating request');
        const {
            date,
            invoiceId,
            itemId,
            cost,
            taxRate
        } = body;
        
        // Validate date
        if (!Helpers.isDateValid(date))
            Helpers.throwValidationFailure('date', body);

        // Validate invoiceId
        if (!Helpers.isGUIDValid(invoiceId))
            Helpers.throwValidationFailure('invoiceId', body);

        // Validate ItemId
        if (!Helpers.isGUIDValid(itemId))
            Helpers.throwValidationFailure('itemId', body);

        // Validate Cost
        const parsedCost = Number(cost);
        if (!Helpers.isCostValid(parsedCost))
            Helpers.throwValidationFailure('cost', body);

        // Validate Tax
        const parsedTaxRate = Number(taxRate);
        if (!Helpers.isTaxValid(parsedTaxRate))
            Helpers.throwValidationFailure('taxRate', body);

        return {
            date: new Date(date),
            invoiceId,
            itemId,
            cost: parsedCost,
            taxRate: parsedTaxRate
        }
    }

    updateSale(body: saleBody) {
        console.log('Updating Sale');
        const {
            date,
            invoiceId,
            itemId,
            cost,
            taxRate
        } = this.validateBody(body);
    }
}
