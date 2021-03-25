import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, Observer } from 'rxjs';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';
import { ReadFileService } from 'src/app/services/read-file.service';

const INVALID_FILE = ' Invalid file.';
const INVALID_IMAGE = ' Invalid image.';
const INVALID_SIZE = ' Invalid Size.';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  data: any[];
  errorMessage;
  viewModel;

  constructor(private readFileService: ReadFileService, private courseinstanceService: CourseinstanceService) { }

  addCourseForm = new FormGroup({
    file: new FormControl(undefined, Validators.required),
  });

  ngOnInit(): void {
  }

  uploadFiles($event): void {
    this.data = null;
    this.errorMessage = null;
    this.readFileService.readFile($event.target).subscribe({
      next: content => this.data = content,
      error: err => this.errorMessage = err, 
    });
  }

  upload(){
    this.courseinstanceService
      .add(this.data)
      .subscribe((course) => {
        console.log(course);
        this.viewModel = course;
      }); 
    this.addCourseForm.reset();
  }
}


