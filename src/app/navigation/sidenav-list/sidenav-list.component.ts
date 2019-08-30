import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

// Services
import { AuthService } from 'src/app/auth/signup/auth.service';

// Stores
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  constructor(private store: Store<fromRoot.State>,private authService:AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(){
    this.closeSidenav.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}