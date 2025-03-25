import { Injectable } from '@nestjs/common';
import { eventTypes, item } from './constants';
import Helpers from '../shared/helpers'
import { DataSource } from 'typeorm';
import{ InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {}

    validateSalesBody(body: any){
        console.log('validating request');
        const {
            date,
            invoiceId,
            items
        } = body;

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
            date: new Date(date),
            invoiceId,
            items: parsedItems
        }
    }

    validateTaxBody(body: any){
        console.log('validating request');
        const {
            date,
            amount
        } = body;

        // Validate date
        if (!Helpers.isDateValid(date))
            Helpers.throwValidationFailure('date', body);

        // Validate amount
        const parsedAmount = Number(amount);
        if (!Helpers.isCostValid(parsedAmount))
            Helpers.throwValidationFailure('amount', body);

        return {
            date: new Date(date),
            amount: parsedAmount
        }
    }

    createTransaction(body: any) {
        console.log('Creating transaction');
        const { eventType } = body;
        switch(eventType) {
            case (eventTypes.SALES): {
                const { 
                    date,
                    invoiceId,
                    items
                } = this.validateSalesBody(body)
                this.handleSale(date, invoiceId, items);
                break;
            }
            case (eventTypes.TAX_PAYMENT): {
                const { 
                    date,
                    amount
                } = this.validateTaxBody(body)
                this.handleTaxPayment(date, amount);
                break;
            }
            default: {
                Helpers.throwValidationFailure('eventType', body);
            }
        }
    }

    handleSale(date: Date, invoiceId: string, items: item[]) {
        console.log(`Adding Sale with invoiceId\"${invoiceId}\" and date \"${date}\"`);
        //TODO
    }

    handleTaxPayment(date: Date, amount: number) {
        console.log(`Adding Tax Payment of value \"${amount}\" and date \"${date}\"`);
        // TODOs
    }
}
