import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course';
import { CourseInstance } from 'src/app/models/CourseInstance';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';
import { ReadFileService } from 'src/app/services/read-file.service';

@Component({
  selector: 'course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent {
  data: CourseInstance[];
  viewModel;

  constructor(private courseinstanceService: CourseinstanceService, private readFileService: ReadFileService) {}

  addCourseForm = new FormGroup({
    file: new FormControl(undefined, Validators.required),
  });

  upload(){
    this.courseinstanceService
      .add(this.data)
      .subscribe((course) => {
        console.log(course);
        this.viewModel = course;
      }); 
    this.addCourseForm.reset();
  }

  onFileChange($event): void {
    this.data = this.readFileService.readThis($event.target);
  }
}
