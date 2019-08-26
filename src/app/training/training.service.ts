 import { map, take } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromTraining from '../reducers/training.reducer';
import * as Training from '../actions/training.actions';
@Injectable()
export class TrainingService{
  private fbSubs :Subscription[] = [];
  constructor(private store:Store<fromTraining.State>  ,private db:AngularFirestore,private uiService:UIService){}

  fetchAvailableExercises(){
    this.fbSubs.push(this.db.
    collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray =>{
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()["name"],
          duration: doc.payload.doc.data()["duration"],
          calories: doc.payload.doc.data()["calories"],
        };
      });
    }))
    .subscribe((exercises:Exercise[]) =>{ 
      this.store.dispatch(new Training.SetAvailableTrainings(exercises))
    },() => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Fetching Exercise failed, plesae try again later',null,3000);
    }));
  }

  startExercise(selectedId:string){
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => { 
      this.addDataToDatabase({...ex,date:new Date(),state:'completed'});
      this.store.dispatch(new Training.StopTraining());  
    })
  }

  cancelExercise(progress:number){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => { 
      this.addDataToDatabase({
        ...ex,date:new Date(),
        state:'completed',
        duration:ex.duration * (progress / 100),
        calories:ex.calories * (progress / 100)
          
    });
      this.store.dispatch(new Training.StopTraining());  
    }) 
  }

  fetchCompletedOrCancelledExercises(){    
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises:Exercise[])=>{
      this.store.dispatch(new Training.SetFinishedTrainings(exercises))
    }));
  }

  cancelSubscription(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise:Exercise){
    this.db.collection('finishedExercises').add(exercise);
  }
}