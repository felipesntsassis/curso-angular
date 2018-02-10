import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string;

  cursos: string[] = ['Java', 'ExtJS 4', 'Angular JS'];

  constructor() {
    this.nomePortal = 'http://a3.io';
  }

  ngOnInit() {
  }

}
