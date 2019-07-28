import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IssueService } from './../../issue.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userInfo: any;
  authToken: any;
  userName: string
  userId: string
  modalRef: BsModalRef;
  notifyList: any[]
  constructor(public router: Router, public appService: AppService, private toastr: ToastrService, private _issueService: IssueService, private modalService: BsModalService) { }

  ngOnInit() {

    this.userInfo = this.appService.getUserInfoFromLocalStorage();
    console.log(this.userInfo);

    this.authToken = this.userInfo.authToken;
    this.userId = this.userInfo.userDetails.userId

    this.userName = this.userInfo.userDetails.fullName;
    console.log(this.userName);
    this.getNotification()
  }
  logout = () => {
    this.appService.logoutUser(this.userInfo.userDetails.userId, this.authToken).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status === 200) {
        Cookie.delete('authToken');
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        // while logout we need to clear localstorage
        localStorage.clear();
        this.toastr.success('Logged out successfully!!');
        this.router.navigate(['/']);
      }
      else if (apiResponse.message === 'User logged out already or user not registered') {
        console.log(apiResponse.message);
        this.toastr.error(apiResponse.message);
        this.router.navigate(['/']);
      }
      else {
        console.log(apiResponse.message);
        this.toastr.error(apiResponse.message);
        this.router.navigate(['/']);
      }
    });
  }; // end of logout
  openModalWithClass(template: TemplateRef<any>) {
    this.getNotification()
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  public getNotification() {
    console.log("get Notification")
    this._issueService.getNotify(this.userId, this.authToken)
      .subscribe(
        (resp) => {
          if (resp.status == 200) {
            console.log(" get notify")

            this.notifyList = resp.data
            console.log(this.notifyList)

          } else {

          }
        }
      )
  }
  public issueSelected = (issueId) => {
    this.router.navigate(['/editissue', issueId]);
    this.modalRef.hide()
  }



}