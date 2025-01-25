import { Validator } from './validator.interface';

export class CNPJValidator implements Validator {
    isValid(value: string): boolean {
        if (!value) return false;

        const cleanCnpj = value.replace(/\D/g, '');

        if (cleanCnpj.length !== 14 || /^(\d)\1+$/.test(cleanCnpj)) {
            return false;
        }

        return this.validateDigits(cleanCnpj);
    }

    private validateDigits(cnpj: string): boolean {
        const calculateDigit = (factor: number, max: number): number =>
            Array.from(cnpj)
                .slice(0, max)
                .reduce((sum, num, index) => sum + parseInt(num, 10) * (factor - index % 8), 0) % 11;

        const digit1 = calculateDigit(5, 12) < 2 ? 0 : 11 - calculateDigit(5, 12);
        const digit2 = calculateDigit(6, 13) < 2 ? 0 : 11 - calculateDigit(6, 13);

        return digit1 === parseInt(cnpj[12], 10) && digit2 === parseInt(cnpj[13], 10);
    }
}
