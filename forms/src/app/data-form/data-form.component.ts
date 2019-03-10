import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  urlViaCEP = 'https://viacep.com.br/ws';
  headers: HttpHeaders;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', this.urlViaCEP);
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Methods', 'GET');
    this.headers.append('Content-type', 'application/json; charset=utf-8');
  }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl('', Validators.required),
    //     ...
    //   })
    // });
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
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors.email && campoEmail.touched;
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
    let cep = this.formulario.get('endereco.cep').value;

    if (cep !== '') {
      cep = cep.replace(/\D/g, '');
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.resetaDadosForm();
        this.http.get(`${this.urlViaCEP}/${cep}/json`, { headers: this.headers })
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDadosForm(dados));
      }
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
    this.http.post('https://httpbin.org/post', this.formulario.value)
      .pipe(map(res => res))
      .subscribe(dados => {
          console.log(dados);
          // reseta o form
          this.resetar();
        },
        (error: any) => alert('Erro!')
      );
  }

  resetar() {
    this.formulario.reset();
  }
}
