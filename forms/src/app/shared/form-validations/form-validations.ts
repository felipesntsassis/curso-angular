import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { ROUTER_CONFIGURATION } from '@angular/router';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      // const values = formArray.controls;
      // let totalChecked = 0;
      // // tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < values.length; i++) {
      //   if (values[i].value === true) {
      //     totalChecked += 1;
      //   }
      // }

      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);

      return totalChecked >= min ? null : { required: true };
    };

    return validator;
  }

  static cepValidator(control: FormControl) {
    let cep = control.value;
    cep = cep.replace(/\D/g, '');

    if (cep && cep !== '') {
      const validaCep = /^[0-9]{8}$/;

      return validaCep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (control: FormControl) => {
      if (otherField === null || otherField === undefined) {
        throw new Error('É necessário informar um campo.');
      }

      if (!control.root || !(control.root as FormGroup).get(otherField)) {
        return null;
      }

      const field = (control.root as FormGroup).get(otherField);

      if (!field) {
        throw Error('É necessário informar um campo válido');
      }

      if (field.value !== control.value) {
        return { equalsToInvalid: otherField };
      }

      return null;
    };

    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: `CEP inválido.`
    };

    return config[validatorName];
  }
}
