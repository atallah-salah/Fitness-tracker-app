// Modules
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../shared/shared.module';

// Components
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';

// Routing Module
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';

// import * as fromRoot from '../app.reducer';
import { trainingReducer } from '../reducers/training.reducer';
@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent

  ],
  imports:[
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training',trainingReducer)
  ],
  exports:[],
  entryComponents:[StopTrainingComponent]
})
export class TrainingModule {}