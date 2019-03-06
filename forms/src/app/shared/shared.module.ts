import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CampoControlErrorComponent,
    FormDebugComponent
  ],
  exports: [
    CampoControlErrorComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
