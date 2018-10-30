import { ExamService } from './../services/exam.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student } from "./../models/student";
import { Observable } from "rxjs/Observable";
import { Router, NavigationExtras } from "@angular/router";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

@Component({
  selector: "app-edit-result",
  templateUrl: "./edit-result.component.html",
  styleUrls: ["./edit-result.component.scss"]
})
export class EditResultComponent implements OnInit {
  public examId: string;
  public maxMarks: string;
  public subject: string;
  public division: string;
  public docId: string;

  studentCol: AngularFirestoreCollection<Student>;
  // studentCol: Student[];
  students: Observable<Student[]>;

  rows: Student[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private examService: ExamService,
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

    this.studentCol = this.afs.collection("examList", ref =>
      ref.where("examId", "==", this.examId).orderBy("serialNo")
    );
    this.students = this.studentCol.snapshotChanges().map(actions =>{
        return actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        data.docId = id;
        return data;
      });
    });
    this.students.subscribe(stud => {
      console.log("-------------");
      console.log(stud);
      this.rows = stud;
    });
    console.log("++++++++++++++++++++++++++++-------");
    console.log(this.rows);
  }

  ngOnInit() {}

  onSave() {
    this.examService.updateExam(this.rows, this.examId, this.docId);
    this.router.navigate(['exam']);

  }

  scoreChange(event, rowIndex, value) {
    this.rows[rowIndex].score = event.target.value;
    this.rows[rowIndex].isChanged = true;
    // console.log("Index is ------>" + rowIndex);
    // console.log(event.target.value);
    // console.log(this.rows[rowIndex].firstName);
  }
}
