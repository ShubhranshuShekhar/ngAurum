
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FirebaseauthService } from '../../../shared/services/firebaseauth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(private auth: FirebaseauthService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }




  signin() {
    const signinData = this.signinForm.value;
    console.log(signinData);
    console.log(signinData.username);

    this.submitButton.disabled = true;
       this.progressBar.mode = 'indeterminate';
this.auth.signInWithEmail(signinData.username, signinData.password).then((val)=>{
  console.log("i am in then of main function");
  this.router.navigate(['dashboard']);
}).catch((err)=>{
  console.log("i am in cath of else Main function");
  this.submitButton.disabled = false;
  this.progressBar.mode = null;
});


  }

}
