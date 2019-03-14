import { FormArray, FormControl } from '@angular/forms';

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
}
