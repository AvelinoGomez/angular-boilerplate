import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PhoneValidator {
  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const cleanValue = value.toString().replace(/\D/g, '');

      // Verifica se o número tem 10 ou 11 dígitos (para números fixos e celulares no Brasil)
      const isValid = cleanValue.length === 10 || cleanValue.length === 11;

      return isValid ? null : { phoneInvalid: true };
    };
  }
}
