import { HttpClientModule } from '@angular/common/http';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule({
  declarations: [
    CampoControlErrorComponent,
    FormDebugComponent,
    ErrorMsgComponent
  ],
  exports: [
    CampoControlErrorComponent,
    FormDebugComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
