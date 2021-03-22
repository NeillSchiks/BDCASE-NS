import { Component, OnInit } from '@angular/core';
import { CourseInstance } from 'src/app/models/CourseInstance';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';

@Component({
  selector: 'app-courseinstance-list',
  templateUrl: './courseinstance-list.component.html',
  styleUrls: ['./courseinstance-list.component.css']
})
export class CourseinstanceListComponent implements OnInit {
  courseinstances: CourseInstance[];

  constructor(private courseInstanceService: CourseinstanceService) { }

  ngOnInit(): void {
    this.courseInstanceService.getAll().subscribe((courseinstances) => {
      this.courseinstances = courseinstances;
    })
  }

}
