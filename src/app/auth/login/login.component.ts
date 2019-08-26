import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../signup/auth.service';
import { UIService } from 'src/app/shared/ui.service';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$:Observable<boolean>;
  constructor(private authService:AuthService,private uiService:UIService,private store:Store<{ui:fromApp.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading)); 
    this.loginForm = new FormGroup({
      email : new FormControl('',{
        validators:[Validators.required,Validators.email]
      }),
      password: new FormControl('',{
        validators:[Validators.required]
      })
    })
  }

  onSubmit(){
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    });
  }
}
