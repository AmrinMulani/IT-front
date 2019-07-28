import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from "@angular/forms"
import { DataTablesModule } from 'angular-datatables';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { CreateissueComponent } from './createissue/createissue.component'
import { NgxEditorModule } from 'ngx-editor';
import { RouterModule } from '@angular/router';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MyviewComponent } from './myview/myview.component';
import { ViewallComponent } from './viewall/viewall.component';



@NgModule({
  declarations: [DashboardComponent, CreateissueComponent, EditIssueComponent, MyviewComponent, ViewallComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavBarModule,
    NgxEditorModule,
    RouterModule,
    DataTablesModule,
    TabsModule.forRoot()
  ]

})
export class IssuetrackerModule { }
