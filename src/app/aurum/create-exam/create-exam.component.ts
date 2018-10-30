import { ExamService } from "./../services/exam.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { MatProgressBar } from "@angular/material";

import { Router } from "@angular/router";
import { AppLoaderService } from "./../../shared/services/app-loader/app-loader.service";

@Component({
  selector: "app-create-exam",
  templateUrl: "./create-exam.component.html",
  styleUrls: ["./create-exam.component.scss"]
})
export class CreateExamComponent implements OnInit {


  formData = {};
  console = console;
  basicForm: FormGroup;
  isSaved = false;
  courses: Observable<Course[]>;

  selectedValue: string = 'Unit Test';
  selectedCourse: Course;

  categories = [
    { value: 'Unit Test', viewValue: 'Unit Test' },
    { value: 'Terminal', viewValue: 'Terminal' },
    { value: 'Class Test', viewValue: 'Class Test' },
    { value: 'Surprise', viewValue: 'Surprise' },
    { value: 'Others', viewValue: 'Others' },
  ];


  constructor(
    private examService: ExamService,
    private router: Router,
    private loader: AppLoaderService
  ) {}

  ngOnInit() {

    this.courses = this.examService.getCourses();


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

  onSubmit(){

  }

}
