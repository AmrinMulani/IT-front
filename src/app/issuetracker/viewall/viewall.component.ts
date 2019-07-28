import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpResponse } from '@angular/common/http';


//import { environment } from 'environments/environment';

class Issue {
  title: string
  createdOn: Date;
  reporter: string;
  assignee: string
  status: string
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;

}

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  issues: Issue[];
  currentuserId: string
  currentUserName: string
  authToken: string
  private baseUrl = "http://localhost:3000/api/v1";
  // private baseUrl = environment.baseUrl

  constructor(
    public _router: Router,
    public service: AppService,
    private toastr: ToastrService,
    private http: HttpClient

  ) { }

  ngOnInit() {
    let localStg = JSON.parse(localStorage.getItem('userInfo'));
    this.currentuserId = localStg.userDetails.userId;

    this.currentUserName = localStg.userDetails.fullName

    this.authToken = localStg.authToken;
    let userId = localStg.userDetails.userId;
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      autoWidth: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            `${this.baseUrl}/issue/getallissue?authToken=${this.authToken}`, dataTablesParameters, {}
          ).subscribe(resp => {
            console.log(resp.data);
            that.issues = resp.data["data"];
            //console.log(resp.recordsTotal )
            callback({
              recordsTotal: resp.data["recordsTotal"],
              recordsFiltered: resp.data["recordsFiltered"],
              data: []
            });
          });
      },
      columns: [{ data: 'title', width: '30%' }, { data: 'status' }, { data: 'reporter', width: '20%' }, { data: 'assignee', width: '20%' }, { data: 'createdOn', width: '30%' }]
    };
  }
  public issueSelected = (issueId) => {
    this._router.navigate(['/editissue', issueId]);
  }


}


