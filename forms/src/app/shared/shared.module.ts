import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [
    CampoControlErrorComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent
  ],
  exports: [
    CampoControlErrorComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
