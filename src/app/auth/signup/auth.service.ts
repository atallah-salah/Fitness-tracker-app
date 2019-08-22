import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,private aFAuth:AngularFireAuth){

  }

  registerUser(authData: AuthData){
    this.aFAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      this.authSuccessfully();
    })
    .catch(error =>{
      console.log(error);
      
    })
    this.authChange.next(true);
  }

  login(authData: AuthData){
    this.aFAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      this.authSuccessfully();
    })
    .catch(error =>{
      console.log(error);
      
    })
    this.authChange.next(true);
  }

  logout(){
    this.authChange.next(false);
    this.isAuthenticated = false;
  }

  isAuth(){
    return this.isAuthenticated;
  }

  private authSuccessfully(){
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}



// isAuthenticated