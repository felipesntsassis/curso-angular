import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, delay } from 'rxjs/operators';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(`${environment.API}cursos`).pipe(
      delay(2000),
      tap(console.log)
    );
  }

}
