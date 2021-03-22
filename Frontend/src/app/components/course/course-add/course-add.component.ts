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
  fileName = '';

    constructor(private httpClient: HttpClient) {}

    onFileSelected(event) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);
            console.log(formData)

            const upload$ = this.httpClient.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
        }
    }
}
