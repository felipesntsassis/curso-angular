import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente sem unsubscribe';
  valor: string;

  sub: Subscription[] = [];
  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.sub.push(this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruído!`);
  }

}
