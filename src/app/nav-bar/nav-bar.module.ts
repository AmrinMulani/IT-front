import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  exports: [
    NavComponent
  ]
})
export class NavBarModule { }
