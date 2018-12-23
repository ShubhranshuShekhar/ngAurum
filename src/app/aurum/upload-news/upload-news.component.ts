import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { News } from '../models/news.model';

@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.component.html',
  styleUrls: ['./upload-news.component.scss']
})
export class UploadNewsComponent implements OnInit {
  basicForm: FormGroup;
  url: any
  selectedFile: File;
  isSelected: boolean
  news: News
  constructor() { }

  ngOnInit() {
    this.basicForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      details: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),

      // agreed: new FormControl("", (control: FormControl) => {
      //   const agreed = control.value;
      //   if (!agreed) {
      //     return { agreed: true };
      //   }
      //   return null;
      // })
    });
  }

  onFileChanged(event) {
    var reader = new FileReader()
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile.name)
    reader.readAsDataURL(this.selectedFile)
    reader.onload = (_event) => { 
      this.url = reader.result; 
      if(this.url)
        this.isSelected = true
    }
  }

  onSubmitNews(){
    this.news = new News()
      console.log("Submit news has been clicked");
      this.news.title = this.basicForm.value["title"];
      this.news.details = this.basicForm.value["details"];
      this.news.date = this.basicForm.value["date"];
      this.news.category = this.basicForm.value["category"]
  }
}
