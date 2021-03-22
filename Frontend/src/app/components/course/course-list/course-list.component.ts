import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { CourseInstance } from 'src/app/models/CourseInstance';
import { CourseService } from 'src/app/services/course.service';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAll().subscribe((courses) => {
      this.courses = courses;
    })
  }

}
