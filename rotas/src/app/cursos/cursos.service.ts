import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  getCursos() {
    return [
      { id: 1, nome: 'Java'},
      { id: 2, nome: 'Angular 2'}
    ];
  }

  getCurso(id: number) {
    const cursos = this.getCursos();

    for (let i = 1; i < cursos.length; i++) {
        const curso = cursos[i];

      if (curso.id == id) {
        return curso;
      }

      return null;
    }
  }

  constructor() { }

}
