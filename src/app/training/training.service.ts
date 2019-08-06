import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';

export class TrainingService{
  exerciseChanged = new Subject<Exercise>();

  private availableExercises:Exercise[]=[
    {id :'crunches',name:'Crunches',duration:30,calories:8},
    {id :'touch-toes',name:'Touch Toes',duration:180,calories:15},
    {id :'side-lunges',name:'Side Lunges',duration:120,calories:18},
    {id :'burpess',name:'Burpess',duration:60,calories:8}
  ];

  private runningExercise: Exercise;
  private exercises:Exercise[]=[]

  getAvailableExercises(){
    return [...this.availableExercises];
  }

  startExercise(selectedId:string){
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.exercises.push({...this.runningExercise,date:new Date(),state:'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress:number){
    this.exercises.push({...this.runningExercise,
      date:new Date(),
      state:'cancelled',
      duration:this.runningExercise.duration * (progress / 100),
      calories:this.runningExercise.calories * (progress / 100)});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(){
    return {...this.runningExercise};
  }

  getCompletedOrCancelledExercises(){    
    return this.exercises.slice();
  }
}