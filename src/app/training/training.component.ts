import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';
Subscription
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy {
  onGoingTraining = false;
  exerciseSubscription:Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(ex => {
      if(ex){
        this.onGoingTraining= true;
      }else{
        this.onGoingTraining=false;
      }
    });
  }

  ngOnDestroy(){
    this.exerciseSubscription && this.exerciseSubscription.unsubscribe();
  }
}
