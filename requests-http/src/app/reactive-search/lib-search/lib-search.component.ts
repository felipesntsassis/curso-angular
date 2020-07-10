import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  queryField: FormControl = new FormControl();
  total = 0;

  results$: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;

    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.append('search', value);
      params = params.append('fields', fields);

      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        tap((resp: any) => this.total = resp.total),
        map((resp: any) => resp.results)
      );
    }
  }
}
