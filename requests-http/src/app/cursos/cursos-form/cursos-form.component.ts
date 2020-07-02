import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CursosService } from './../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { map, switchMap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private modalService: AlertModalService,
    private service: CursosService
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params.id;
    //     console.log(id);
    //     const curso$ = this.service.loadById(+id);
    //     curso$.subscribe((curso: Curso) => this.updateForm(curso));
    //   }
    // );

    // this.route.params.pipe(
    //   map((params: any) => params.id),
    //   switchMap(id => this.service.loadById(+id))
    // )
    // .subscribe((curso) => this.updateForm(curso));

    // Concat Map -> a ordem da requisição importa
    // mergeMap -> a ordem não importa
    // exhaustMap -> casos de login

    const curso  = this.route.snapshot.data.curso;
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
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

      let msgSuccess = 'Curso Criado com sucesso!';
      let msgError = 'Erro ao criar curso. Tente novamente.';

      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso. Tente novamente.';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modalService.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modalService.showAlertDanger(msgError)
      );

      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modalService.showAlertSuccess('Curso atualizado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modalService.showAlertDanger('Erro ao atualizar curso. Tente novamente.'),
      //     () => console.log('update completo')
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.modalService.showAlertSuccess('Criado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modalService.showAlertDanger('Erro ao criar curso. Tente novamente.'),
      //     () => console.log('request completada')
      //   );
      // }
      this.form.reset();
    }
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }
}
