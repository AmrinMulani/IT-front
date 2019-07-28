import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { IssueService } from "../../issue.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {

  constructor(private _service: AppService, private _route: Router, private _issueService: IssueService,
    private toastr: ToastrService) { }
  authToken: string
  assigneearray: any[]
  selectFile: File = null;
  imageUrl: string;
  issueTitle: string
  description: string
  assigneeId: string
  reporterId: string
  reporterName: string



  ngOnInit() {
    let localStg = JSON.parse(localStorage.getItem('userInfo'));
    this.reporterId = localStg.userDetails.userId;
    //this.userInfo = this._service.getUserInfoFromLocalStorage()
    this.reporterName = localStg.userDetails.fullName
    // console.log('\n\n\ncurrentusername ' + this.currentuserName)
    this.authToken = localStg.authToken;
    this.getUserList()
  }

  public getUserList = () => {
    this._service.getListUser(this.authToken).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          this.assigneearray = apiResponse["data"];
          console.log(this.assigneearray)
        } else {
          console.log(apiResponse.message)
        }
      }
    );
  }
  onFileSelected(event) {

    this.selectFile = <File>event.target.files[0];
  }

  public submitIssue: any = () => {
    if (this.issueTitle === "" || this.issueTitle === undefined || this.issueTitle === null) {
      alert("Please issue title");
    } else if (this.description === "" || this.description === undefined || this.description === null) {
      alert("Please issue description");
    } else if (this.assigneeId === "" || this.assigneeId === undefined || this.assigneeId === null) {
      alert("Please assign this issue to user");
    } else if (this.selectFile.name === "" || this.selectFile.name === undefined || this.selectFile.name === null) {
      alert("Please attach the screenshot");
    } else {


      const uploadData = new FormData();
      uploadData.append('file', this.selectFile, this.selectFile.name);
      uploadData.append('title', this.issueTitle);
      uploadData.append('description', this.description);
      uploadData.append('authToken', this.authToken);
      uploadData.append('reporter', this.reporterName);
      uploadData.append('reporterId', this.reporterId);
      uploadData.append('assigneeId', this.assigneeId);
      uploadData.append('authToken', this.authToken);



      this._issueService.createIncident(uploadData).subscribe(
        apiResponse => {

          if (apiResponse.status === 200) {

            this.toastr.success('issue created successfully', 'Success');
            this._route.navigate(["/dashboard"]);

          } else {
            this.toastr.error(apiResponse.message, 'Error')
          }
        },
        error => {

          this.toastr.error(error["message"], 'Error')
        }
      );//end of service call
    }
  }
}

