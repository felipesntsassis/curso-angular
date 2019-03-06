import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    // Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    // nome: [null, [
    //   Validators.required, Validators.minLength(3), Validators.maxLength(20)
    // ]],
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
