import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { NaoencontradoComponent } from './naoencontrado/naoencontrado.component';

const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'nao-encontrado', component: NaoencontradoComponent },
  { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(cursosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CursosRoutingModule {}
