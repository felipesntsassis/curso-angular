import { Component, OnInit, Input } from '@angular/core';
import { 
  OnChanges, 
  DoCheck, 
  AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log("construtor");
  }

  ngOnInit() {
    this.log("ngOnInit");
  }

  ngOnDestroy() {
    this.log("ngOnDestroy");
  }

  ngOnChanges() {
    this.log("ngOnChanges");
  }

  ngDoCheck() {
    this.log("ngDoCheck");
  }

  ngAfterContentInit() {
    this.log("ngAfterContentInit");
  }

  ngAfterContentChecked() {
    this.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    this.log("ngAfterViewInit");
  }

    ngAfterViewChecked() {
    this.log("ngAfterViewChecked");
  }

  private log(hook: string) {
    console.log(hook);
  }
}
