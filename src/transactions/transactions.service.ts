import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { eventTypes, item, transactionBody } from './constants';
import Helpers from '../shared/helpers'

@Injectable()
export class TransactionsService {
    validateBody(body: transactionBody){
        console.log('validating request');
        const {
            eventType,
            date,
            invoiceId,
            items
        } = body;

        // Validate event type
        if (!eventType || !(eventType in eventTypes))
            Helpers.throwValidationFailure('eventType', body);

        // Validate date
        if (!Helpers.isDateValid(date))
            Helpers.throwValidationFailure('date', body);

        // Validate invoiceId
        if (!Helpers.isGUIDValid(invoiceId))
            Helpers.throwValidationFailure('invoiceId', body);

        // Validate Items and cast numbers
        const parsedItems = items.map((item) => {
            if (!Helpers.isGUIDValid(item.itemId))
                Helpers.throwValidationFailure('itemId', body);

            const parsedCost = Number(item.cost);
            if (!Helpers.isCostValid(parsedCost))
                Helpers.throwValidationFailure('cost', body);

            if (!Helpers.isTaxValid(item.taxRate))
                Helpers.throwValidationFailure('taxRate', body);

            return {
                itemId: item.itemId,
                cost: parsedCost,
                taxRate: item.taxRate
            }
        })

        return {
            eventType,
            date: new Date(date),
            invoiceId,
            items: parsedItems
        }
    }

    createTransaction(body: transactionBody) {
        console.log('Creating transaction');
        const {
            eventType,
            date,
            invoiceId,
            items
        } = this.validateBody(body);
        switch(eventType) {
            case (eventTypes.SALES): {
                this.handleSale(date, invoiceId, items);
                break;
            }
            case (eventTypes.TAX_PAYMENT): {
                this.handleTaxPayment(date, invoiceId, items);
                break;
            }
            default: {
                Helpers.throwValidationFailure('emptyBody', body);;
            }
        }
    }

    handleSale(date: Date, invoiceId: string, items: item[]) {
        console.log('Adding Sale');
        //TODO
    }

    handleTaxPayment(date: Date, invoiceId: string, items: item[]) {
        console.log('Adding Tax Payment');
        // TODOs
    }
}
