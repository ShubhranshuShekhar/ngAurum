import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Student } from "./../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentColPath: string;
  studentCol: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  constructor(private afs: AngularFirestore) {
    this.studentColPath = "students";
    this.studentCol = this.afs.collection(this.studentColPath);


  }

  getAllStudents() {
    console.log("-- in getAllStudents() --")
    this.studentCol = this.afs.collection("students", ref =>
      ref.orderBy("serialNo")
    );
    this.students = this.studentCol.valueChanges();
    console.log(this.students)
    return this.students;

  }
}
