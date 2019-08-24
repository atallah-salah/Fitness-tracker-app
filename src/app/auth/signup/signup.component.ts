import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  public maxDate;
  isLoading = false;
  private loadingSubs:Subscription;
  constructor(private authService : AuthService,private uiService:UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoadingState =>{
      this.isLoading = isLoadingState;
    })
    this.maxDate = new Date();    
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form:NgForm){
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    })
    console.log(form);
  }
  ngOnDestroy(){
    this.loadingSubs && this.loadingSubs.unsubscribe();
  }
}
