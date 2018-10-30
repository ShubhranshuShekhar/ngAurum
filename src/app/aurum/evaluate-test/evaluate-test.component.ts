import { ExamService } from "./../services/exam.service";
import { Student } from "./../models/student";
import { Component, OnInit, Input } from "@angular/core";
import { Exam } from "../exam.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";


import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

@Component({
  selector: "app-evaluate-test",
  templateUrl: "./evaluate-test.component.html",
  styleUrls: ["./evaluate-test.component.scss"]
})
export class EvaluateTestComponent implements OnInit {
  rows: Student[];
  columns: any;
  examForm: FormGroup;

  studentCol: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;

  public examId: string;
  public maxMarks: string;
  public subject: string;
  public division: string;
  public docId: string;
  // public students: Observable<Student[]>;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private afs: AngularFirestore,
    private router: Router,
    private _fb: FormBuilder

  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.examId = params["examId"];
      this.maxMarks = params["maxMarks"];
      this.division = params["division"];
      this.docId = params["docId"];

    });

    this.getStudents();
  }

  getStudents() {
    this.studentCol = this.afs.collection("students", ref => ref.where("division", '==', this.division).orderBy("serialNo"));
      this.studentCol.valueChanges()
      .subscribe(stud => {
        console.log("-------------");
        console.log(stud);
        this.rows = stud;
      });
    console.log("++++++++++++++++++++++++++++-------");
    console.log(this.rows);
  }

  scoreChange(event, rowIndex, value) {
    this.rows[rowIndex].score = event.target.value;
    // console.log("Index is ------>" + rowIndex);
    // console.log(event.target.value);
    // console.log(this.rows[rowIndex].firstName);
  }

onSubmit(){
this.examService.evaluateExam(this.rows, this.examId, this.docId);
this.router.navigate(['exam']);

}

onFormSubmit(){

}

  ngOnInit() {
    this.examForm = this._fb.group({
      score: this._fb.array([
          this.initScoreValidator(),
      ])
  });

  }

initScoreValidator() {
  // initialize our address
  return this._fb.group({
      score: ['', Validators.required],
  });
}

addScore() {
  // add address to the list
  const control = <FormArray>this.examForm.controls['score'];
  control.push(this.initScoreValidator());
}



    // this.examForm = new FormGroup({
    //   score: new FormControl("", [Validators.required]),
    // });
    // this.basicForm.addControl();

    // this.basicForm = new FormGroup({
    //   title: new FormControl("", [Validators.required]),
    //   date: new FormControl("", [Validators.required]),
    //   details: new FormControl("", [Validators.required]),
    //   receiver: new FormControl("", [Validators.required]),
    //   sender: new FormControl("", [Validators.required]),
    //   designation: new FormControl("", [Validators.required]),
    //   department: new FormControl("", [Validators.required]),

    //   agreed: new FormControl("", (control: FormControl) => {
    //     const agreed = control.value;
    //     if (!agreed) {
    //       return { agreed: true };
    //     }
    //     return null;
    //   })
    // });

  }

