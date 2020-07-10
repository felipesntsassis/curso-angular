import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { take, tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'name,description,version,homepage';

  queryField: FormControl = new FormControl();
  total = 0;

  results$: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.results$ = this.queryField.valueChanges.pipe(
    //   (tap(value => console.log(value)))
    // );
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200), // tempo necessário para a digitação
      distinctUntilChanged(),
      switchMap((value) => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((resp: any) => this.total = resp.total),
      map((resp: any) => resp.results)
    );
  }

  onSearch() {

    let value = this.queryField.value;

    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: this.FIELDS
      };

      let params = new HttpParams();
      params = params.append('search', value);
      params = params.append('fields', this.FIELDS);

      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        tap((resp: any) => this.total = resp.total),
        map((resp: any) => resp.results)
      );
    }
  }
}
