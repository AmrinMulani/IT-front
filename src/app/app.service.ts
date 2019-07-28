import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
//Importing observables related code
import { Observable } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = "http://localhost:3000/api/v1";

  //private baseUrl = environment.baseUrl

  constructor(public http: HttpClient) { }

  // for HTML5 local storage
  public setUserInfoInLocalStorage = (data) => {
    // converting the JSON into string and storing
    localStorage.setItem("userInfo", JSON.stringify(data));

  };

  public getUserInfoFromLocalStorage = () => {
    // getting back the string in the JSON format
    return JSON.parse(localStorage.getItem("userInfo"));
  };

  public signInFunction(data): any {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("password", data.password)
      .set("email", data.email)
      .set("mobileNumber", data.mobileNumber)


    let response = this.http.post(`${this.baseUrl}/users/signup`, params);
    return response;
  }


  public socialLoginFunction(data): any {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      // .set("password", data.password)
      .set("email", data.email)
    // .set("mobileNumber", data.mobileNumber)


    let response = this.http.post(`${this.baseUrl}/users/socialLogin`, params);
    return response;
  }

  public loginFunction(data): any {
    const params = new HttpParams()
      .set("password", data.password)
      .set("email", data.email);

    let response = this.http.post(`${this.baseUrl}/users/login`, params);
    return response;
  }

  public resetPasswordFunction(data): any {
    const params = new HttpParams()
      .set("password", data.password)
      .set("email", data.email);

    let response = this.http.post(`${this.baseUrl}/users/resetpassword`, params);
    return response;
  }

  public authorizeUser(data): any {
    const params = new HttpParams()
      .set("forgotPassToken", data);

    let response = this.http.post(`${this.baseUrl}/users/authorizeUser`, params);
    return response;
  }

  public changePassword(data): any {
    const params = new HttpParams()
      .set("newPassword", data.newPassword)
      .set("userId", data.userId);

    let response = this.http.put(`${this.baseUrl}/users/changePassword`, params);
    return response;
  }

  public getListUser(authToken): any {
    let response = this.http.get(
      `${this.baseUrl}/users/alluser?authToken=${authToken}`
    );
    return response;
  }







  public logoutUser(userId, authToken): any {
    const params = new HttpParams()
      .set("userId", userId);
    let response = this.http.post(`${this.baseUrl}/users/logout?authToken=${authToken}`, params);
    return response;
  }



  //general exception handler for http request
  private handleError(err: HttpErrorResponse) {
    console.log("Handle error http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
