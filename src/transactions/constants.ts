export enum eventTypes {
    SALES = 'SALES',
    TAX_PAYMENT = 'TAX_PAYMENT'
}

export type item = {
    itemId: string,
    cost: number,
    taxRate: number
}

export type transactionBody = {
    eventType: string,
    date: string,
    invoiceId: string,
    items: item[]
}
