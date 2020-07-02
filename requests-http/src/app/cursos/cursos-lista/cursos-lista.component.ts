import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

// import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  // bsModalRef: BsModalRef;

  @ViewChild('deleteModal') deleteModal;

  cursoSelecionado: Curso;
  deleteModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private service: CursosService
  ) { }

  ngOnInit(): void {
    // this.service.list().subscribe(cursos => this.cursos = cursos);
    this.onRefresh();
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.deleteModalRef.hide();
        this.alertService.showAlertSuccess('Curso removido com sucesso!');
        this.onRefresh();
      },
      error => {
        this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao remover o curso. Tente novamente mais tarde.');
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
