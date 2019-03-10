import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from '../shared/models/estado-br';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

import { DropdownService } from './../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: EstadoBr[];
  urlViaCEP = 'https://viacep.com.br/ws';
  headers: HttpHeaders;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', this.urlViaCEP);
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Methods', 'GET');
    this.headers.append('Content-type', 'application/json; charset=utf-8');
  }

  ngOnInit() {
    this.dropdownService.getEstadosBr()
      .subscribe((dados: any) => this.estados = dados);
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      })
    });
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
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

  consultaCep() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', this.formulario.value)
        .pipe(map(res => res))
        .subscribe(
          dados => {
            console.log(dados);
            // reseta o form
            this.resetar();
          },
          (error: any) => alert('Erro!')
        );
    } else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }
}
