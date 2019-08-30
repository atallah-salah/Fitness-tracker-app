import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Actions
import * as UI from  '../../actions/ui.actions';
import * as Auth from  '../../actions/auth.actions';

// Reducers
import * as fromRoot from '../../app.reducer';

// Stores
import { Store } from '@ngrx/store';

// Services
import { TrainingService } from 'src/app/training/training.service';
import { UIService } from 'src/app/shared/ui.service';

@Injectable()
export class AuthService {
  constructor(private store :Store<{ui:fromRoot.State}>,private router: Router,private aFAuth:AngularFireAuth,private traningService:TrainingService,private uiService:UIService){}

  initAithListener(){
    this.aFAuth.authState.subscribe(user => {
      if(user){
        this.store.dispatch(new Auth.SetAuthenticated());        
        this.router.navigate(['/training']);
      }else{
        this.traningService.cancelSubscription();
        this.store.dispatch(new Auth.SetUnauthenticated());        
        this.router.navigate(['/']);
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
  }

  logout(){
    this.aFAuth.auth.signOut();
  }
}