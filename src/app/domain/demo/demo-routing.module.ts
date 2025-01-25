import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoHomeComponent } from './pages/demo-home/demo-home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'home', component: DemoHomeComponent },
    ]),
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
