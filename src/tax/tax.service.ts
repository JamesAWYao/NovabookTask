import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Helpers from '../shared/helpers';

@Injectable()
export class TaxService {
    validateDate (date: string): Date {
        if (!Helpers.isDateValid(date))
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

        return new Date(date);
    }

    queryTaxPosition(rawDate: string) {
        const date = this.validateDate(rawDate);
    }
}
