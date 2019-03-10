import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<any> {
    return this.http.get('./assets/dados/estados-br.json')
      .pipe(map((res: Response) => res));
  }
}
