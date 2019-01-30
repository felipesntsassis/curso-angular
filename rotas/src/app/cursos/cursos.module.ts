import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';
import { CursosRoutingModule } from './cursos.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CursosRoutingModule
  ],
  exports: [],
  declarations: [
    CursosComponent,
    CursoDetalheComponent
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule {}
