import { AngularFireAuth } from "angularfire2/auth";
import "rxjs/add/operator/take";
import { Observable } from "rxjs/Observable";
import { FirebaseauthService } from "./../firebaseauth.service";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = false; // Set this value dynamically
  // private isAuthenticated; // Set this value dynamically

  constructor(
    private authService: AngularFireAuth,
    private router: Router,
    private firebaseAuth: FirebaseauthService
  ) {}



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.firebaseAuth.authenticated) {
      console.log("this seems to be authenticated");
      return true; }
    this.router.navigate(["/sessions/signin"]);
    return false;
  }






  //   return this.authService.authState.map((auth) =>  {
  //     if(auth == null) {
  //       return false;
  //     } else {
  //       return auth.uid;
  //     }
  //   });



    // this.authService.auth.getRedirectResult().then(result => {
    //   console.log("i am in can activate");
    //   console.log(result.user);
    //   if (result.user != null) {
    //     // this.router.navigateByUrl('profile');
    //     this.router.navigate(["/sessions/signin"]);
    //     return false;
    //   }
    //   return true;
    // });

    // return false;

    // return this.afAuth.authState
    //   .take(1)
    //   .map(authState => !!authState)
    //   .do(auth => !auth ? this.router.navigate(["/sessions/signin"]) : true);





}
