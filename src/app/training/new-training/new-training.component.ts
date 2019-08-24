import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  isLoading = false;
  exercises:Exercise[];
  exerciesSubscription:Subscription;
  loadingSubs:Subscription;
  constructor(private trainingService: TrainingService,private uiService:UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoadingState=>{
      this.isLoading = isLoadingState;
    })
    this.exerciesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {this.exercises = exercises});
    this.fetchExercies();
  }

  ngOnDestroy(){
    this.exerciesSubscription && this.exerciesSubscription.unsubscribe();
    this.loadingSubs && this.loadingSubs.unsubscribe();
  }
  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercies(){
    this.trainingService.fetchAvailableExercises();

  }
}
