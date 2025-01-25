import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoHomeComponent } from './pages/demo-home/demo-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';

import { PhonePipe } from 'app/shared/pipes/phone.pipe';
import { CnpjPipe } from 'app/shared/pipes/cnpj.pipe';
import { CpfPipe } from 'app/shared/pipes/cpf.pipe';
import { DemoApiService, ImplDemoApiService } from './services/demo-api.service';



@NgModule({
  declarations: [
    DemoHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoRoutingModule,
    PhonePipe,
    CnpjPipe,
    CpfPipe,
  ],
  providers: [
    { provide: DemoApiService, useClass: ImplDemoApiService }
  ]
})
export class DemoModule { }
