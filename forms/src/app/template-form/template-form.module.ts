import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CampoControlErrorComponent } from './../campo-control-error/campo-control-error.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { TemplateFormComponent } from './template-form.component';

@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TemplateFormModule { }
