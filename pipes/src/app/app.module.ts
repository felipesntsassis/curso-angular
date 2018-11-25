import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { registerLocaleData } from '@angular/common';
import { SettingsService } from './settings.service';
import { FiltroArrayPipe } from './filtro-array.pipe';

registerLocaleData(localePtBr, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt-BR' }
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingService) => settingService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
