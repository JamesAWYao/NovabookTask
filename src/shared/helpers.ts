export default class Helpers {
    static isDateValid(date: string): boolean {
        // taken from https://stackoverflow.com/questions/28020805/regex-validate-correct-iso8601-date-string-with-time
        const ISO8601Regex = new RegExp(/^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:Z|[+-][01]\d:[0-5]\d)$/);
        return ISO8601Regex.test(date);
    }

    static isGUIDValid(id: string): boolean {
        // taken from https://www.geeksforgeeks.org/how-to-validate-guid-globally-unique-identifier-using-regular-expression/
        const GUIDRegex = new RegExp(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/);
        return GUIDRegex.test(id);
    }

    static isCostValid(cost: number): boolean {
        if (!Number.isInteger(cost))
            return false

        if (cost < 0)
            return false

        return true
    }

    static isTaxValid(tax: number): boolean {
        if (tax < 0)
            return false

        return true
    }
}