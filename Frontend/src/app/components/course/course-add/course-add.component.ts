import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';

@Component({
  selector: 'course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent {

  constructor() {}

  addCourseForm = new FormGroup({
    file: new FormControl(undefined, Validators.required),
  });

  uploadFile($event){
    this.readThis($event.target);
  }

  onFileChange($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = function (e) {
        //myReader.result is a String of the uploaded file
        console.log(myReader.result);

        //fileString = myReader.result would not work, 
        //because it is not in the scope of the callback
    }
    
    myReader.readAsText(file);
  }
}


