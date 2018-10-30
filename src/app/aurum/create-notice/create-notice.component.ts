import { Notice } from "./../notice";
import { FirebaseauthService } from "./../../shared/services/firebaseauth.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { MatProgressBar } from "@angular/material";

import { Router } from "@angular/router";
import { AppLoaderService } from "./../../shared/services/app-loader/app-loader.service";

@Component({
  selector: "app-create-notice",
  templateUrl: "./create-notice.component.html",
  styleUrls: ["./create-notice.component.scss"]
})
export class CreateNoticeComponent implements OnInit {
  @ViewChild(MatProgressBar)
  progressBar: MatProgressBar;

  // noticeCollection: AngularFirestoreCollection<Notice>;
  // notices: Observable<Notice[]>;

  formData = {};
  console = console;
  basicForm: FormGroup;
  isSaved = false;
  notice: Notice;
  constructor(
    private fire: FirebaseauthService,
    private router: Router,
    private loader: AppLoaderService
  ) {}

  ngOnInit() {
    this.basicForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      details: new FormControl("", [Validators.required]),
      receiver: new FormControl("", [Validators.required]),
      sender: new FormControl("", [Validators.required]),
      designation: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),

      agreed: new FormControl("", (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true };
        }
        return null;
      })
    });
  }

  onSubmit() {
    this.isSaved = true;
    console.log("Submit notice has been clicked");
    console.log(this.basicForm.value);
    console.log(this.basicForm.value["title"]);

    this.progressBar.mode = "indeterminate";
    this.notice = new Notice();

    this.notice.title = this.basicForm.value["title"];
    this.notice.details = this.basicForm.value["details"];
    this.notice.date = this.basicForm.value["date"];
    this.notice.sender = this.basicForm.value["sender"];
    this.notice.designation = this.basicForm.value["designation"];
    this.notice.department = this.basicForm.value["department"];
    this.notice.receiver = this.basicForm.value["receiver"];

    //   console.log("------------before calling create notice--------------");
    // console.log(this.notice.title);
    // console.log(this.notice.details);
    // console.log(this.notice.department);
    // console.log(this.notice.designation);
    if (this.isSaved) {
      this.fire
        .createNotice(this.notice)
        .then(() => {
          this.loader.open("Creating Notice");
            setTimeout(() => {
              this.loader.close();
            }, 3000);
          this.router.navigate(["notice"]);
        })
        .catch(() => {
          this.progressBar.mode = null;
          this.isSaved = false;
        });
    }
    // let notice: Notice = {
    //   title: "This is the title",
    //   details: "Thjis is the detail",
    //   // date: Date.now(),
    //   receiver: "Hello",
    // };
  }
}
