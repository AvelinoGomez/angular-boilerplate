import { Validator } from './validator.interface';

export class CPFValidator implements Validator {
    isValid(value: string): boolean {
        if (!value) return false;

        const cleanCpf = value.replace(/\D/g, '');

        if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) {
            return false;
        }

        return this.validateDigits(cleanCpf);
    }

    private validateDigits(cpf: string): boolean {
        const calculateDigit = (factor: number): number =>
            Array.from(cpf)
                .slice(0, factor - 1)
                .reduce((sum, num, index) => sum + parseInt(num, 10) * (factor - index), 0) % 11;

        const digit1 = calculateDigit(10) < 2 ? 0 : 11 - calculateDigit(10);
        const digit2 = calculateDigit(11) < 2 ? 0 : 11 - calculateDigit(11);

        return digit1 === parseInt(cpf[9], 10) && digit2 === parseInt(cpf[10], 10);
    }
}
