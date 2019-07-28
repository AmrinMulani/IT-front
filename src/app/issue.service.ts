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
export class IssueService {

  private baseUrl = "http://localhost:3000/api/v1";
  //private baseUrl = environment.baseUrl


  constructor(public http: HttpClient) { }
  public createIncident(data): any {

    let response = this.http.post(`${this.baseUrl}/issue/createissue`, data);
    return response;
  }
  public getIncident(issueId, authToken): any {

    return this.http.get(`${this.baseUrl}/issue/getissuebyid/${issueId}?authToken=${authToken}`)
  }
  public updateIncident(data, issueId): any {
    const params = new HttpParams()
      .set("assigneeId", data.assigneeId)
      .set("assigneeName", data.assigneeName)
      .set("status", data.status)
      .set("description", data.description)
      .set("authToken", data.authToken)


    let response = this.http.put(`${this.baseUrl}/issue/updateissuebyid/${issueId}`, params);
    return response;
  }
  public getNotify(userId, authToken): any {

    return this.http.get(`${this.baseUrl}/comment/getnotify/${userId}?authToken=${authToken}`)
  }
  public addAComment(data): any {
    const params = new HttpParams()
      .set("comment", data.comment)
      .set("commenterName", data.commenterName)
      .set("issueId", data.issueId)
      .set("authToken", data.authToken)


    let response = this.http.post(`${this.baseUrl}/comment/addcomment`, params);
    return response;
  }

  public addAWatcher(data): any {
    const params = new HttpParams()
      .set("watcherId", data.watcherId)
      .set("watcherName", data.watcherName)
      .set("issueId", data.issueId)
      .set("authToken", data.authToken)

    let response = this.http.post(`${this.baseUrl}/comment/addwatcher`, params);
    return response;
  }

  public addANotify(data): any {

    console.log("Service notify")
    const params = new HttpParams()
      .set("watchersId", JSON.stringify(data.watchersId))
      .set("assigneeId", data.assigneeId)
      .set("reporterId", data.reporterId)
      .set("notifyDescription", data.notifyDescription)
      .set("issueId", data.issueId)
      .set("authToken", data.authToken)

    let response = this.http.post(`${this.baseUrl}/comment/addnotify`, params);
    return response;
  }

  public getComment(issueId: string, skip: number, authToken: string): any {
    console.log("service comment")
    console.log(authToken)

    return this.http.get(`${this.baseUrl}/comment/getcomment/${issueId}/${skip}?authToken=${authToken}`)
  }

  public getWatcher(issueId, authToken): any {

    return this.http.get(`${this.baseUrl}/comment/getwatchlist/${issueId}?authToken=${authToken}`)
  }

}
