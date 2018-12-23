import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: News
  constructor() { }
}
