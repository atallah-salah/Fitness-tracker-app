import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent} from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';

import * as fromTraining from '../../reducers/training.reducer';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  constructor(private store : Store<fromTraining.State>,private dialog : MatDialog,private trainingService:TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
  this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex =>{
    const step = ex.duration / 100 *1000;

    this.timer = setInterval(()=>{
      this.progress+=5;
      if(this.progress>= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },step); 
  });
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{
      data:{
        progress:this.progress
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.trainingService.cancelExercise(this.progress);
    }else{
      this.startOrResumeTimer();
    }
  })
  }
}
