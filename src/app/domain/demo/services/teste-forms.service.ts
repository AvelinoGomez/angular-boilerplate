import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'app/core/validators/custom-validators';
import { PhoneValidator } from 'app/core/validators/phone.validator';

@Injectable({
  providedIn: 'root'
})
export class TesteFormsService {

  private _generalDemoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, CustomValidators.cpf]),
    cnpj: new FormControl('', [Validators.required, CustomValidators.cnpj]),
    phone: new FormControl('', [Validators.required, PhoneValidator.phone()]), // Validador de telefone
    disableControl: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });;

  constructor() { }

  get generalDemoForm(): FormGroup {
    return this._generalDemoForm;
  }
}
