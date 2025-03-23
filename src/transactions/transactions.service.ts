import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { eventTypes, item, transactionBody } from './constants';
import Helpers from '../shared/helpers'

@Injectable()
export class TransactionsService {
    validateBody(body: transactionBody){
        const {
            eventType,
            date,
            invoiceId,
            items
        } = body;

        // Validate event type
        if (!eventType || !(eventType in eventTypes))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate date
        if (!Helpers.isDateValid(date))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate invoiceId
        if (!Helpers.isGUIDValid(invoiceId))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        // Validate Items
        items.forEach((item) => {
            if (!Helpers.isGUIDValid(item.itemId))
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

            if (Helpers.isCostValid(item.cost))
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

            if (Helpers.isTaxValid(item.taxRate))
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        })

        return {
            eventType,
            date: new Date(date),
            invoiceId,
            items
        }
    }

    createTransaction(body: transactionBody) {
        const {
            eventType,
            date,
            invoiceId,
            items
        } = this.validateBody(body);
        switch(eventType) {
            case (eventTypes.SALES): {
                this.handleSale(date, invoiceId, items);
            }
            case (eventTypes.TAX_PAYMENT): {
                this.handleTaxPayment(date, invoiceId, items);
            }
            default: {
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }
        }
    }

    handleSale(date: Date, invoiceId: string, items: item[]) {
        //TODO
    }

    handleTaxPayment(date: Date, invoiceId: string, items: item[]) {
        //TODO
    }
}
