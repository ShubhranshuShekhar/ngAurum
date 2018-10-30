import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Notice } from "../../aurum/notice";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

import 'rxjs/add/operator/take';

@Injectable({
  providedIn: "root"
})
export class FirebaseauthService {
  private user: firebase.User = null;
  // private user: any = null;
  authState: any = null;

  public data: any = [];
  public docId: string;
  public isAdmin: boolean = false;
  public displayName: string;
  // authState: AngularFireAuth.authState = null;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {

    // this._firebaseAuth.authState.subscribe((auth) => {
    //   console.log("--------i am in subscribe-!!!!!");
    //   this.authState = auth;
    // });



    // this._firebaseAuth.authState
    // .take(1)
    // .map(authState => !!authState)
    // .do(auth => !auth ? this.router.navigate(["/sessions/signin"]) : true);
    // this._firebaseAuth.authState.take(1).map((auth) =>  {
    //     console.log("--------i am in MAPPP-!!!!!");
    //     console.log(auth);
    //   this.authState = auth;
    // });



  }



  saveInLocal(key, val): void {
    console.log("Saving = key:" + key + "value:" + val);
    this.storage.set(key, val);
    this.data[key] = this.storage.get(key);
  }

  getFromLocal(key): void {
    console.log("recieved= key:" + key);
    this.data[key] = this.storage.get(key);
    console.log(this.data);
  }

  get authenticated(): boolean {
    this.getFromLocal("isAdmin");
    this.getFromLocal("displayName");
    this.getFromLocal("photoURL");

    console.log("displayName state is ----" + this.data["displayName"]);
    // return this.authState !== null;
    return this.data["displayName"] !== null;

  }

  logOut() {
    console.log("-------i am logging out---------");
    this.saveInLocal("displayName", null);
    this._firebaseAuth.auth.signOut();
  }

  // isLoggedIn(): boolean {
  //   var val: boolean = false;
  //   console.log("---Firebase Auth async is logged in ");
  //   this.user.subscribe(user => {
  //     if (user) {
  //       this.docId = user.uid;
  //       // this.getRoles();

  //       this.getFromLocal("isAdmin");
  //       if (this.data["isAdmin"] == null) {
  //         this.getRoles();
  //       } else {
  //         this.isAdmin = this.data["isAdmin"];
  //       }
  //       console.log("---->>>> yes i am ");
  //       val = true;
  //     } else {
  //       console.log(":( :( :( :( no i am not");
  //       return false;
  //     }
  //   });
  //   return val;
  // }

  signInWithEmail(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(
        res => {
          this._firebaseAuth.auth.setPersistence(
            firebase.auth.Auth.Persistence.SESSION
          );
          this.authState = res;
          this.saveInLocal("displayName", "something");
          this.docId = res.user.uid;
          this.setRoles();
          this.isAdmin = this.data["isAdmin"];
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  setRoles() {
    console.log("-------I am getting roles-------");
    console.log("doc id is " + this.docId);
    this.afs
      .collection("users")
      .doc(this.docId)
      .ref.get()
      .then(doc => {
        var temp;
        const data = doc.data();
        this.isAdmin = data["isAdmin"];
        this.displayName = data["displayName"];
        // console.log(this.isAdmin);
        this.saveInLocal("isAdmin", this.isAdmin);
        this.saveInLocal("displayName", this.displayName);

        temp = data["photoURL"];
        this.saveInLocal("photoURL", temp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async createNotice(notice: Notice) {
    let isTeacher: boolean;
    let isStudent: boolean;
    let addressedTo: string;
    console.log("---------i am in createNotice()-------------");
    if (notice.receiver === "all") {
      isTeacher = true;
      isStudent = true;
      addressedTo = "Everyone";
    }

    if (notice.receiver === "teachers") {
      isTeacher = true;
      isStudent = false;
      addressedTo = "Only Teachers";
    }

    if (notice.receiver === "students") {
      isTeacher = false;
      isStudent = true;
      addressedTo = "Only Students";
    }

    this.afs
      .collection("notice")
      .add({
        title: notice.title,
        details: notice.details,
        isTeacher: isTeacher,
        isStudent: isStudent,
        date: notice.date,
        sender: notice.sender,
        department: notice.department,
        designation: notice.designation,
        addressedTo: addressedTo
      })
      .then(msg => {
        console.log("notice has been successfully updated");
        console.log(msg);
      })
      .catch(err => {
        console.log("There has been an error in creating notice");
        console.log(err);
      });
  }
}
