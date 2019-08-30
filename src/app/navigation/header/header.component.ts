import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

// Stores
import { Store } from '@ngrx/store';

// Services
import { AuthService } from 'src/app/auth/signup/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$ : Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,private authService:AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }

}
