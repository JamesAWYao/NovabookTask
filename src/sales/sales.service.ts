import { Injectable } from '@nestjs/common';
import { saleBody } from "./constants";
import Helpers from '../shared/helpers';
import { DataSource } from 'typeorm';
import{ InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class SalesService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {}

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

        console.log(`Updating invoice ${invoiceId} to time ${date} if it exists`);
        this.dataSource.query(`
            UPDATE Transactions
            SET dateAdded = CAST('${date.toISOString()}' AS DATETIME)
            WHERE invoiceId = '${invoiceId}'
        `);

        console.log(`Upserting item ${itemId} with cost ${cost} and tax rate ${taxRate}`);
        this.dataSource.query(`
            IF NOT EXISTS (SELECT 1 FROM Items WHERE itemId = '${itemId}')
            BEGIN
                INSERT INTO Items
                VALUES ('${itemId}', ${cost}, ${taxRate})
            END
            ELSE
            BEGIN
                UPDATE Items
                SET cost = ${cost}, taxRate = ${taxRate}
                WHERE itemId = '${itemId}'
            END
        `);
    }
}
