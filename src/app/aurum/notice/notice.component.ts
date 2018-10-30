import { Notice } from './../notice';
import { Component, OnInit } from '@angular/core';
import { egretAnimations } from "../../shared/animations/egret-animations";
import { Router } from "@angular/router";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  animations: egretAnimations,

})
export class NoticeComponent implements OnInit {

  noticeCol: AngularFirestoreCollection<Notice>;
  notices: Observable<Notice[]>;

  constructor(private router: Router, private afs: AngularFirestore) { }

  ngOnInit() {

    this.noticeCol = this.afs.collection('notice');
    // this.notices = this.noticeCol.valueChanges();


    this.notices = this.noticeCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Notice;
        const id = a.payload.doc.id;
        data.docId = id;
        return data;
      });
    });
  }

onAddNotice(){
  console.log("Add notice has been clicked");
  this.router.navigate(['create_notice']);
}


deleteNotice(docId: string){
  this.noticeCol.doc(docId).delete().then(() => {
    console.log('deleted');
  })
}

}
