import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<any> {
    return this.http.get('assets/dados/estados-br.json')
      .pipe(map((res: Response) => res));
  }

  getCidades(id: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((cidades: Cidade[]) => cidades.filter(c => c.estado == id))
      );
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Sênior', desc: 'Dev Sr' },
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' },
    ];
  }

  getNewsLetter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' },
    ];
  }

}
