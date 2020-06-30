import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

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

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    // this.service.list().subscribe(cursos => this.cursos = cursos);
    this.cursos$ = this.service.list();
  }

}
