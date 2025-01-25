import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CPFValidator } from './cpf.validator';
import { CNPJValidator } from './cnpj.validator';

export class CustomValidators {
    private static cpfValidator = new CPFValidator();
    private static cnpjValidator = new CNPJValidator();
    private static phoneValidator = new CNPJValidator();


    /**
     * Validador para CPF.
     */
    static cpf(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            return this.cpfValidator.isValid(value) ? null : { cpfInvalid: true };
        };
    }

    /**
     * Validador para CNPJ.
     */
    static cnpj(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            return this.cnpjValidator.isValid(value) ? null : { cnpjInvalid: true };
        };
    }

    /**
     * Validador para CPF.
     */
    static phone(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            return this.phoneValidator.isValid(value) ? null : { phoneInvalid: true };
        };
    }

}
