import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,private aFAuth:AngularFireAuth,private traningService:TrainingService){}

  initAithListener(){
    this.aFAuth.authState.subscribe(user => {
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else{
        this.traningService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData){
    this.aFAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })
    this.authChange.next(true);
  }

  login(authData: AuthData){
    this.aFAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })
    this.authChange.next(true);
  }

  logout(){
    this.aFAuth.auth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }
}



// isAuthenticated