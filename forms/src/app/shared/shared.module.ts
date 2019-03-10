import { HttpClientModule } from '@angular/common/http';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';

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
    CommonModule,
    HttpClientModule
  ],
  providers: [DropdownService]
})
export class SharedModule { }
