
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CursosService } from './../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private modalService: AlertModalService,
    private service: CursosService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onCancel() {
    console.log('cancel');
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      this.submitted = false;
      this.service.create(this.form.value).subscribe(
        success => {
          this.modalService.showAlertSuccess('Criado com sucesso!');
          this.location.back();
        },
        error => this.modalService.showAlertDanger('Erro ao criar curso. Tente novamente.'),
        () => console.log('request completada')
      );
      this.form.reset();
    }
  }

}
