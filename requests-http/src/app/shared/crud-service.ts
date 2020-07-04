import { HttpClient } from '@angular/common/http';

import { delay, tap, take } from 'rxjs/operators';

export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private apiUrl: string) {
  }

  list() {
    return this.http.get<T[]>(`${this.apiUrl}`).pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadById(id: number) {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  remove(id: number) {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  save(record: T) {
    if (record['id']) {
      return this.update(record);
    }

    return this.create(record);
  }

  private create(record: T) {
    return this.http.post<T>(`${this.apiUrl}`, record).pipe(take(1));
  }

  private update(record: T) {
    return this.http.put<T>(`${this.apiUrl}/${record['id']}`, record).pipe(take(1));
  }
}
