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


    validateDate (date: string): Date {
        console.log('validating request');
        if (!Helpers.isDateValid(date))
            Helpers.throwValidationFailure('date', date);

        return new Date(date);
    }

    queryTaxPosition(rawDate: string) {
        console.log('Querying Tax Position');
        const date = this.validateDate(rawDate);

        console.log(`Checking up to ${date}`);
        return this.dataSource.query('SELECT * FROM TaxPayments;');
    }
}
