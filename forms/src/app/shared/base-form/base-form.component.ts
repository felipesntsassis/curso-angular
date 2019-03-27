import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray ) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaValidTouched(campo: string) {
    return (
      this.formulario.get(campo) &&
      (!this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty))
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo) &&
      this.formulario.get(campo).hasError('required') &&
      (!this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty))
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return (
        campoEmail.errors.email && (campoEmail.touched || campoEmail.dirty)
      );
    }
  }

  aplicaErroCss(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  aplicaErroCssCampo(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

}
