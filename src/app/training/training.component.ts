import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Reducers
import * as fromTraining from '../reducers/training.reducer';

// Services
import { TrainingService } from './training.service';

// Stores
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$:Observable<boolean>;

  constructor(private store :Store<fromTraining.State>,private trainingService:TrainingService) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}