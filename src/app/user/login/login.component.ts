import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { ToastrService } from "ngx-toastr";
import { AppService } from "../../app.service";

import { AuthService, SocialUser, GoogleLoginProvider } from "ng4-social-login"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginEmail: any;
  public user: any = SocialUser
  email: string
  firstName: string
  lastName: String

  loginPassword: any;
  constructor(
    public _router: Router,
    public service: AppService,
    private toastr: ToastrService,
    private socialAuthService: AuthService

  ) { }


  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log("google")
      console.log(user);
    });

  }

  socialLogin() {
    console.log('here')
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.email = userData.email
      this.firstName = this.user.name.split(' ')[0]
      this.lastName = userData.name.split(' ')[1]

      let data = {
        firstName: this.firstName.toLowerCase(),
        lastName: this.lastName.toLowerCase(),
        type: userData.provider,
        email: this.email,
      }
      this.service.socialLoginFunction(data)
        .subscribe((apiResponse) => {
          console.log("service")

          if (apiResponse.status === 200) {

            Cookie.set("authToken", apiResponse.data.authToken);
            Cookie.set("userId", apiResponse.data.userDetails.userId);
            Cookie.set("receiverName", apiResponse.data.userDetails.firstName + " " + apiResponse.data.userDetails.lastName);
            this.service.setUserInfoInLocalStorage(apiResponse.data);
            this._router.navigate(['/dashboard']);
            console.log("social login")
            console.log(apiResponse.data)

          } (err) => {
          }


        })

    })
  }
  public goToSignUp: any = () => {
    this._router.navigate(["/signup"]);
  };

  // public goToForgotpassword: any = () => {
  //   this._router.navigate(["/forgotpassword"]);
  // };

  login(): any {
    if (
      //  this.loginEmail === "" ||
      this.loginEmail === undefined ||
      this.loginEmail === null
    ) {
      alert("Please enter your email");
    } else if (
      this.loginPassword === "" ||
      this.loginPassword === undefined ||
      this.loginPassword === null
    ) {
      alert("Please enter your password.");
    } else {
      let data = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      console.log("email" + this.loginEmail)
      console.log("password" + this.loginPassword)

      this.service.loginFunction(data).subscribe(apiResponse => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          console.log("login");
          this.toastr.success("Logged in successfully!!");
          Cookie.set("authToken", apiResponse.data.authToken);
          Cookie.set("userId", apiResponse.data.userDetails.userId);
          Cookie.set("receiverName", apiResponse.data.userDetails.firstName + " " + apiResponse.data.userDetails.lastName);
          this.service.setUserInfoInLocalStorage(apiResponse.data);
          console.log("login");

          this._router.navigate(["/dashboard"]);
        } else {
          console.log(apiResponse);
          this.toastr.error(apiResponse.message);
        }
      });
    }
  }

}
