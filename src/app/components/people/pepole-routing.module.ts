import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PepoleComponent } from './pepole/pepole.component';

const routes: Routes = [
  {
    path: '',
    component:PepoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PepoleRoutingModule { }
