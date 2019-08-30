import { Component, OnInit} from '@angular/core';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// Reducers
import * as fromTraining from '../../reducers/training.reducer';
import * as fromRoot from '../../app.reducer';

// Services
import { TrainingService } from '../training.service';
import { UIService } from 'src/app/shared/ui.service';

// Stores
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  isLoading$ : Observable<boolean>;
  exercises$:Observable<Exercise[]>;
  constructor(private store :Store<fromTraining.State>,private trainingService: TrainingService,private uiService:UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercies();
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercies(){
    this.trainingService.fetchAvailableExercises();
  }
}
