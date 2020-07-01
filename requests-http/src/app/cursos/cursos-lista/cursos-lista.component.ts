import { Component, OnInit } from '@angular/core';

import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

@Component({
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    // this.service.list().subscribe(cursos => this.cursos = cursos);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

}
