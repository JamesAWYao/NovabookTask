import { Injectable } from '@nestjs/common';
import Helpers from '../shared/helpers';
import { DataSource } from 'typeorm';
import{ InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TaxService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {}


    validateDate(date: string): Date {
        console.log('validating request');
        if (!Helpers.isDateValid(date))
            Helpers.throwValidationFailure('date', date);

        return new Date(date);
    }

    async getSalesTax(date: Date) {
        const sales = await this.dataSource.query(`
            SELECT * 
            FROM Transactions T
            LEFT JOIN Items I
            ON T.itemId = I.itemId
            WHERE dateAdded < CAST('${date.toISOString()}' AS DATETIME)
        `);

        const salesTax = sales.reduce((total, item) => total + Math.floor(item.cost * item.taxRate), 0);
        console.log(`Found ${sales.length} sales totalling ${salesTax} in tax`);
        return salesTax;
    }

    async getPayments(date: Date) {
        const payments = await this.dataSource.query(`
            SELECT * 
            FROM Payments
            WHERE dateAdded < CAST('${date.toISOString()}' AS DATETIME)
        `);

        const paid = payments.reduce((total, payment) => total + payment.amount, 0);
        console.log(`Found ${payments.length} payments totalling ${paid}`);
        return paid;
    }

    async queryTaxPosition(rawDate: string) {
        console.log('Querying Tax Position');
        const date = this.validateDate(rawDate);

        console.log(`Checking up to ${date}`);
        const taxPosition = await this.getPayments(date) - await this.getSalesTax(date)

        return {
            date,
            taxPosition
        }
    }
}
