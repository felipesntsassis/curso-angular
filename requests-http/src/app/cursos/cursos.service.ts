import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, delay, take } from 'rxjs/operators';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  create(curso: Curso) {
    return this.http.post<Curso>(`${this.API}`, curso).pipe(take(1));
  }

  list() {
    return this.http.get<Curso[]>(`${this.API}`).pipe(
      delay(2000),
      tap(console.log)
    );
  }

}
