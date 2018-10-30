import { ExamService } from "./../services/exam.service";
import { Student } from "./../models/student";
import { Component, OnInit, Input } from "@angular/core";
import { Exam } from "../exam.model";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl, Validators } from "@angular/forms";


import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {
  rows: Student[];
  columns: any;
  basicForm: FormGroup;

  studentCol: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;

  public examId: string;
  public maxMarks: string;
  public subject: string;
  public division: string;
  public docId: string;
  // public students: Observable<Student[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.examId = params["examId"];
      this.maxMarks = params["maxMarks"];
      this.division = params["division"];
      this.docId = params["docId"];
    });

    this.getStudents();
  }

  getStudents() {
    this.studentCol = this.afs.collection("examList", ref => ref.where("examId", '==', this.examId).orderBy("serialNo"));
      this.studentCol.valueChanges()
      .subscribe(stud => {
        console.log("------STUD-------");
        console.log(stud);
        this.rows = stud;
      });
    console.log("++++++++++++++++++++++++++++-------");
    console.log(this.rows);
  }


  ngOnInit() {

  }

  onEdit(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
          examId: this.examId,
          maxMarks: this.maxMarks,
          subject: this.subject,
          division: this.division,
          docId: this.docId,

      }
  };
    this.router.navigate(['edit_result'], navigationExtras);
  }
}
