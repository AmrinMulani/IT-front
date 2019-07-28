import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  loginPassword: any;

  mobileNumber: any;


  constructor(
    public router: Router,
    public service: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }
  public goToSignIn: any = () => {
    this.router.navigate(["/login"]);
  };


  public signupFunction(): any {

    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,

      email: this.email,
      mobileNumber: this.mobileNumber


    };

    console.log(data);

    this.service.signInFunction(data).subscribe(apiResponse => {
      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.firstName = "";
        this.lastName = "";
        this.password = "";

        this.mobileNumber = "";
        this.toastr.success("Signup successfully!!");
        this.router.navigate(["/login"]);
      } else {
        this.toastr.error(apiResponse.message);
      }
    });
  } // end of signUp
}