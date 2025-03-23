import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Helpers from '../shared/helpers';

@Injectable()
export class TaxService {
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
    }
}
