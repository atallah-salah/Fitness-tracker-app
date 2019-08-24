import { Component, OnInit ,ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';

import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit ,OnDestroy {
  displayedColumns= ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription:Subscription;
  @ViewChild(MatSort,{static: true}) sort:MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator:MatPaginator;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises:Exercise[])=>{
      this.dataSource = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnDestroy(){
    this.exChangedSubscription && this.exChangedSubscription.unsubscribe();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string){
    console.log(44);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
