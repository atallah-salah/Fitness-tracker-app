import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';

import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';

import * as fromTraining from '../../reducers/training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns= ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort,{static: true}) sort:MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator:MatPaginator;

  constructor(private store : Store<fromTraining.State>,private trainingService:TrainingService) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises:Exercise[])=>{
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string){    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
