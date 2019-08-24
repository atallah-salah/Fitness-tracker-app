import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { Subscription } from'rxjs/Subscription'
import { AuthService } from 'src/app/auth/signup/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth : boolean = false;
  authSubscription: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }
  
  ngOnDestroy(){
    this.authSubscription && this.authSubscription.unsubscribe();
  }
}
