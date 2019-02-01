import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  getCursos() {
    return [
      { id: 1, nome: 'Java'},
      { id: 2, nome: 'Angular 2'},
      { id: 3, nome: 'Node JS'}
    ];
  }

  getCurso(id: number) {
    const cursos = this.getCursos();
    return this.getCursos().filter(
      (curso: any) => {
        return curso.id === id;
      }
    )[0];

    // for (let i = 1; i < cursos.length; i++) {
    //     const curso = cursos[i];

    //   // tslint:disable-next-line:triple-equals
    //   if (curso.id == id) {
    //     return curso;
    //   }

    //   return null;
    // }
  }

  constructor() { }

}
