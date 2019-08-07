import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  exercises:Exercise[];
  exerciesSubscription:Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {this.exercises = exercises});
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(){
    this.exerciesSubscription.unsubscribe();
  }
  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
