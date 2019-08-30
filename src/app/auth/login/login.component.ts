import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';

// Services
import { AuthService } from '../signup/auth.service';
import { UIService } from 'src/app/shared/ui.service';

// Stores
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$:Observable<boolean>;
  constructor(private authService:AuthService,private uiService:UIService,private store:Store<{ui:fromRoot.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading); 
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
