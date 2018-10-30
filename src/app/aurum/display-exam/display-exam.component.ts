import { EvaluateTestComponent } from './../evaluate-test/evaluate-test.component';
import { Exam } from './../exam.model';
import { ExamService } from "./../services/exam.service";
import { Component, OnInit} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Router, NavigationExtras } from "@angular/router";
import { Routes } from '@angular/router';


@Component({
  selector: "app-display-exam",
  templateUrl: "./display-exam.component.html",
  styleUrls: ["./display-exam.component.scss"]
})
export class DisplayExamComponent implements OnInit {
  exams: Observable<Exam[]>;
  courses: Observable<Course[]>;
  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {

    this.exams = this.examService.getExams();
    this.courses = this.examService.getCourses();
  }


  onClickExam(exam: Exam) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          examId: exam.examId,
          maxMarks: exam.maxMarks,
          subject: exam.subject,
          division: exam.division,
          docId: exam.docId,

      }
  };
  if(exam.state === "Assigned"){
  this.router.navigate(['evaluate_test'], navigationExtras);
  }

  if(exam.state === "Evaluated"){
    this.router.navigate(['display_result'], navigationExtras);
    }

}


  onCreateExam(){
    console.log("Add notice has been clicked");
    this.router.navigate(['create_exam']);
  }






}
