import { Student } from "./../models/student";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Exam } from "./../exam.model";
import { empty } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ExamService {
  userId: string;

  examCol: AngularFirestoreCollection<Exam>;
  exams: Observable<Exam[]>;

  studentCol: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;

  courseColPath: string;
  courseCol: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;

  constructor(private afs: AngularFirestore) {
    // todo -- change this
    this.userId = "shekhsh01";
    this.courseColPath = "courses/" + this.userId + "/course";

    this.examCol = this.afs.collection("exam");
    this.courseCol = this.afs.collection(this.courseColPath);
  }

  getExams() {
    this.exams = this.examCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Exam;
        const id = a.payload.doc.id;
        data.docId = id;

        return data;
      });
    });

    return this.exams;
  }

  getCourses() {
    this.courses = this.courseCol.valueChanges();
    return this.courses;
  }

  getStudents(division: string) {
    this.studentCol = this.afs.collection("students", ref =>
      ref.where("division", "==", division).orderBy("serialNo")
    );
    this.students = this.studentCol.valueChanges();
    return this.students;
  }

  evaluateExam(students: Student[], examId: string, docId: string) {
    let batch = this.afs.firestore.batch();
    let averageScore: number;
    var totalScore: number = 0;
    var numberOfStudents: number;
    var topScore: number =0;
    var lowestScore: number = 100;
    numberOfStudents = students.length;

    students.forEach(stud => {
      var str = String(stud.score);
      if (stud.score == null || str.length <= 0) {
        stud.score = 0;
      }

      if (stud.score > topScore) {
        topScore = stud.score;
      }

      if (stud.score < lowestScore) {
        lowestScore = stud.score;
      }


      console.log("score is -------" + stud.score);
      totalScore = +totalScore + +stud.score;
      const docRef = this.afs.collection("examList").ref.doc();
      batch.set(docRef, {
        examId: examId,
        firstName: stud.firstName,
        lastName: stud.lastName,
        division: stud.division,
        userId: stud.userId,
        score: stud.score,
        serialNo: stud.serialNo
      });
    });

    batch
      .commit()
      .then(msg => {
        console.log("Scores have been successfully updated");
        console.log(msg);
      })
      .catch(err => {
        console.log("There has been an error in creating scores");
        console.log(err);
      });

    averageScore = totalScore / numberOfStudents;
    averageScore = Math.round(averageScore * 100) / 100;
    console.log("Total score --->" + totalScore);
    console.log("Average score --->" + averageScore);
    console.log("Top score --->" + topScore);
    console.log("Minimum score --->" + lowestScore);

    let examDoc = this.afs.collection("exam").doc(docId);
    examDoc.update({
      state: "Evaluated",
      averageScore: averageScore,
      topScore: topScore,
      lowestScore: lowestScore,

    });
  }

  updateExam(students: Student[], examId: string, docId: string) {
    const batch = this.afs.firestore.batch();
    let averageScore: number;
    let totalScore = 0;
    let numberOfStudents: number;
    let topScore = 0;
    let lowestScore = 100;

    numberOfStudents = students.length;
    try {
      students.forEach(stud => {
        let str = String(stud.score);
        if (stud.score == null || str.length <= 0) {
          stud.score = 0;
        }


      if (stud.score > topScore) {
        topScore = stud.score;
      }

      if (stud.score < lowestScore) {
        lowestScore = stud.score;
      }

        console.log("score is -------" + stud.score);
        totalScore = +totalScore + +stud.score;
        const docRef = this.afs.collection("examList").ref.doc(stud.docId);
        if (stud.isChanged) {
          batch.update(docRef, {
            examId: examId,
            firstName: stud.firstName,
            lastName: stud.lastName,
            division: stud.division,
            userId: stud.userId,
            score: stud.score,
            serialNo: stud.serialNo
          });
        }
      });

      batch
        .commit()
        .then(msg => {
          console.log("Scores have been successfully updated");
          console.log(msg);
        })
        .catch(err => {
          console.log("There has been an error in creating scores");
          console.log(err);
        });

      averageScore = totalScore / numberOfStudents;
      averageScore = Math.round(averageScore * 100) / 100;
      console.log("Total score --->" + totalScore);
      console.log("Average score --->" + averageScore);
      console.log("Top score --->" + topScore);
      console.log("Minimum score --->" + lowestScore);



      let examDoc = this.afs.collection("exam").doc(docId);
      examDoc.update({
        state: "Evaluated",
        averageScore: averageScore,
        topScore: topScore,
        lowestScore: lowestScore
      });
    } catch (err) {
      console.log("--------i am in error--------");
    }
  }
}
