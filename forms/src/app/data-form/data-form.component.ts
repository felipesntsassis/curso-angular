import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { of, empty } from 'rxjs';
import { tap, map, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from '../shared/form-validations/form-validations';
import { Cargo } from './../shared/models/cargo';
import { Cidade } from './../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br';
import { Tecnologia } from './../shared/models/tecnologia';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  estados: EstadoBr[];
  cidades: Cidade[];
  // estados: Observable<EstadoBr>;
  cargos: Cargo[];
  tecnologias: Tecnologia[];
  newsLetterOp: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit() {
    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();
    // this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados);
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsLetterOp = this.dropdownService.getNewsLetter();

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email], [this.verificarEmail.bind(this)]],
      confirmarEmail: ['', [Validators.required, Validators.email, FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, FormValidations.cepValidator]],
        numero: ['', Validators.required],
        complemento: [''],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('Status do CEP: ' + value)),
        switchMap(status => status === 'VALID'
          ? this.cepService.consultaCep(this.formulario.get('endereco.cep').value)
          : of({}))
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {} );

      // this.dropdownService.getCidades(8).subscribe(console.log);
    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
// tslint:disable-next-line: deprecation
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: any) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
    // this.formBuilder.array([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ]);
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

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', valueSubmit)
      .pipe(map(res => res))
      .subscribe(
        dados => {
          console.log(dados);
          // reseta o form
          this.resetar();
        },
        (error: any) => alert('Erro!')
      );
  }

  onSubmit() {


    if (this.formulario.valid) {

    } else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

  verificarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => emailExiste ? { emailInvalido: true } : null)
      );
  }
}
