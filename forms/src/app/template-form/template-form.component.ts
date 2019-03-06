import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };
  urlViaCEP = 'https://viacep.com.br/ws';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', this.urlViaCEP);
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Methods', 'GET');
    this.headers.append('Content-type', 'application/json; charset=utf-8');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form);
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map(res => res))
      .subscribe(dados => console.log(dados));
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaErroCss(campo) {
    return {
      'was-validated': this.verificaValidTouched(campo)
    };
  }

  consultaCep(cep, form) {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.resetaDadosForm(form);
        this.http.get(`${this.urlViaCEP}/${cep}/json`, { headers: this.headers })
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, formulario) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    formulario.form.patchValue({
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

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
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
}
