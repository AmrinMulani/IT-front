import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module'
import { LoginComponent } from './user/login/login.component'
import { SignupComponent } from './user/signup/signup.component';
import { IssuetrackerModule } from './issuetracker/issuetracker.module'
import { DashboardComponent } from './issuetracker/dashboard/dashboard.component'
import { DataTablesModule } from 'angular-datatables';
import { NavBarModule } from './nav-bar/nav-bar.module'
import { NgxEditorModule } from 'ngx-editor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateissueComponent } from './issuetracker/createissue/createissue.component'
import { EditIssueComponent } from './issuetracker/edit-issue/edit-issue.component'
import { MyviewComponent } from './issuetracker/myview/myview.component'
import { ViewallComponent } from './issuetracker/viewall/viewall.component'
import { IssueguardGuard } from './issueguard.guard'
import { TabsModule } from 'ngx-bootstrap';
import { NotfoundComponent } from './notfound/notfound.component';
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig } from "ng4-social-login"


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('4472038110-vflm9bs2eslesf99ekseqlbemqq48mb5.apps.googleusercontent.com')
  }
], false);

export function provideConfig() {
  return config
}

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    NgxEditorModule,
    TabsModule,
    SocialLoginModule,
    ModalModule,
    FormsModule,
    NavBarModule,
    UserModule,
    IssuetrackerModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [IssueguardGuard] },
      { path: 'createissue', component: CreateissueComponent, canActivate: [IssueguardGuard] },
      { path: 'editissue/:issueId', component: EditIssueComponent, canActivate: [IssueguardGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: 'myview', component: MyviewComponent, canActivate: [IssueguardGuard] },
      { path: 'viewall', component: ViewallComponent, canActivate: [IssueguardGuard] },
      { path: 'notfound', component: NotfoundComponent, canActivate: [IssueguardGuard] }

    ]),
  ],
  providers: [{
    provide: AuthServiceConfig, useFactory: provideConfig
  }, IssueguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
