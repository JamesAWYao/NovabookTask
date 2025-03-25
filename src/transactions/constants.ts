export enum eventTypes {
    SALES = 'SALES',
    TAX_PAYMENT = 'TAX_PAYMENT'
}

export type Item = {
    itemId: string,
    cost: number,
    taxRate: number
}

export type TransactionBody = {
    eventType: string,
    date: string,
    invoiceId: string,
    items: Item[]
}
