import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from  '../../actions/ui.actions';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private store :Store<{ui:fromRoot.State}>,private router: Router,private aFAuth:AngularFireAuth,private traningService:TrainingService,private uiService:UIService){}

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
    this.store.dispatch(new UI.StartLoading());
    this.aFAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(() => {
    this.store.dispatch(new UI.StopLoading());
      })
    .catch(error =>{
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message,null,3000);
    })
    this.authChange.next(true);
  }

  login(authData: AuthData){
    this.store.dispatch(new UI.StartLoading());
    this.aFAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(() => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error =>{
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message,null,3000);
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