import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from './../../issue.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {

  authToken: string
  notifyList: any[]
  issue: any
  assigneearray: any[]
  selectFile: File = null;
  imageUrl: string;
  issueTitle: string
  description: string
  assignee: string
  reporterId: string
  reporterName: string
  assigneeId: string
  issueId: string
  reporter: string
  status: string
  currentUserName: string
  public scrollToCommentTop: boolean = false;

  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;
  imageurl: string
  comment: string
  commentList = []
  currentUserId: string
  watchee: boolean = false
  watcherArray: any[]
  allStatus = ["inProgress", "Backlog", "Pending", "Resolved"]

  constructor(private _service: AppService, private _route: Router, private _issueService: IssueService,
    private toastr: ToastrService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.issueId = this.actRouter.snapshot.paramMap.get('issueId');

    const localStg = JSON.parse(localStorage.getItem('userInfo'));
    this.currentUserId = localStg.userDetails.userId;
    //this.userInfo = this._service.getUserInfoFromLocalStorage()
    this.currentUserName = localStg.userDetails.fullName
    console.log('\n\n\ncurrentusername ' + this.currentUserName)
    this.authToken = localStg.authToken;
    this.getUserList();
    this.getissue(this.issueId)
    this.getComment()
    this.getWatcher()
    //    this.getNotification()


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
  public getissue(issueId) {

    this._issueService.getIncident(issueId, this.authToken)
      .subscribe(
        (resp) => {
          if (resp.status == 200) {
            console.log(resp)

            this.issueTitle = resp.data.title
            this.description = resp.data.description;
            this.assigneeId = resp.data.assigneeId;
            this.assignee = resp.data.assignee;
            this.status = resp.data.status;
            this.reporter = resp.data.reporter
            this.reporterId = resp.data.reporterId
            this.imageUrl = resp.data.attachment ? "http://localhost:3000/" + resp.data.attachment : null;


            console.log('\n\n\n\n')
            console.log(this.assigneeId)

          } else {
            this.toastr.info('No issue Found')
          }
        }
      )
  }


  public updateIssue() {

    let obj = {
      description: this.description,
      status: this.status,
      assigneeId: this.assigneeId,
      assigneeName: this.assignee,
      authToken: this.authToken
    }
    this._issueService.updateIncident(obj, this.issueId).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          console.log("Update Issue")
          this.addNotification();
          this.toastr.success('Issue updated successfully', 'Success');
          this.getissue(this.issueId)
        } else {
          console.log(apiResponse.message)
        }
      }
    );
  }

  public addComment() {
    let obj = {
      comment: this.comment,
      commenterName: this.currentUserName,
      issueId: this.issueId,
      authToken: this.authToken,
      createdOn: new Date()
    }
    this._issueService.addAComment(obj).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          this.comment = ""

          this.commentList.push(obj);
          console.log('\n\n\n\napiResponse')

          this.addNotification();
          this.toastr.success('Comment post  successfully', 'Success');
        } else {
          console.log(apiResponse.message)
        }
      }
    );

  }
  public addWatchee() {

    let obj = {

      watcherId: this.currentUserId,
      watcherName: this.currentUserName,
      issueId: this.issueId,
      authToken: this.authToken
    }
    this._issueService.addAWatcher(obj).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {

          this.getWatcher()
          this.toastr.success('Watcher added successfully', 'Success');


        } else {
          console.log(apiResponse.message)
        }
      }
    );


  }
  /*
    public getComment() {
  
      this._issueService.getComment(this.issueId, this.authToken)
        .subscribe(
          (resp) => {
            if (resp.status == 200) {
  
              console.log("Comment list")
              this.commentList = resp.data
              console.log(this.commentList)
            } else {
              //this.toastr.info('No issue Found')
            }
          }
        )
    }*/
  getComment = () => {
    // console.log("Comment section")

    this._issueService.getComment(this.issueId, this.pageValue * 5, this.authToken).subscribe(
      (apiResponse) => {

        let previousData = (this.commentList.length > 0 ? this.commentList.slice() : []);
        if (apiResponse.status == 200) {
          this.commentList = apiResponse.data.concat(previousData);

        }
        else {
          this.commentList = previousData;
          // this.toastr.warning(apiResponse.message);
        }
        this.loadingPreviousChat = false;

      }, (error) => {

        this.toastr.error('Error while fetching comments ' + error);
      }
    );
  };


  public getWatcher() {

    this._issueService.getWatcher(this.issueId, this.authToken)
      .subscribe(
        (resp) => {
          if (resp.status == 200) {


            this.watcherArray = resp.data
            console.log(this.watcherArray)
            for (let x of this.watcherArray) {
              console.log("For of loop")
              if (x.watcherId == this.currentUserId) {
                this.watchee = true;
                console.log("watcher" + this.watchee)
                break;
              }
            }


          } else {
            //this.toastr.info('No issue Found')
          }
        }
      )
  }

  public addNotification() {
    let watcherIdlist = []
    if (this.watcherArray != null) {
      for (let x of this.watcherArray) {
        watcherIdlist.push(x.watcherId)
      }
    }

    const obj = {
      assigneeId: this.assigneeId,
      reporterId: this.reporterId,
      notifyDescription: `'${this.issueTitle}' modified by '${this.currentUserName}'`,
      issueId: this.issueId,
      watchersId: watcherIdlist,
      authToken: this.authToken
      //{"wrewr,erewr"}
    }

    console.log("\n\n\obj")
    console.log(obj)
    this._issueService.addANotify(obj).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          console.log("inside subcribe Notification")

          //          this.toastr.success('Notification added successfully', 'Success');


        } else {
          console.log(apiResponse.message)
        }
      }
    );

  }
  public loadEarlierComments: any = () => {
    this.loadingPreviousChat = true;
    this.pageValue++;
    this.scrollToCommentTop = true;
    this.getComment();
  } //end of load previous chat of user

  public setAssigneeName(event: Event) {
    const control = event.target['options']
    const index = control.selectedIndex;
    this.assignee = control[index].text;
    console.log('\n\n\n\n ' + this.assignee)

  }


  /*public getNotification() {
    console.log("get Notification")
    this._issueService.getNotify(this.currentUserId,this.authToken)
      .subscribe(
        (resp) => {
          if (resp.status == 200) {
            console.log(" get notify")

            this.notifyList = resp.data
            console.log(this.notifyList)

          } else {
            //this.toastr.info('No issue Found')
          }
        }
      )
  }*/
}
