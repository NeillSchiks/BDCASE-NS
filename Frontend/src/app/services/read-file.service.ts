import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { CourseInstance } from '../models/CourseInstance';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  constructor() { }

  readThis(inputValue: any): CourseInstance[] {
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();
    let courses: CourseInstance[] = [];
    //var fileType = inputValue.parentElement.id;
    myReader.onloadend = function(e) {
      //myReader.result is a String of the uploaded file
      let data = myReader.result as string;
      let array = data.split('\n\n');

      let document: any[] = [];
      for(let i = 0; i < array.length; i++) {
        if(array[i] !== ''){
          let object = (array[i].split('\n'));
          document.push(object);
        }
      }
        
        
      for(let i = 0; i < document.length; i++){
        var object = document[i];
        let Title: string;
        let Duration: string;
        let Code: string;
        let DateStart: Date;
        for(let i = 0; i < object.length; i++){
          let t: string[] = object[i].split(':');

          switch(t[0]) { 
            case 'Titel': { 
              Title = t[1].trim();
              break; 
            } 
            case 'Duur': { 
              Duration = t[1].trim();
              break; 
            } 
            case 'Cursuscode': { 
              Code = t[1].trim();
              break; 
            } 
            case 'Startdatum': { 
              let dateString = t[1].trim();
              let dateParts = dateString.split("/");
              var dateObject = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
              DateStart = new Date(dateObject);
              break; 
            } 
            default: { 
              console.error(`${t[0]}: is niet toegestaan`);
              break; 
            } 
          }
        }
        let courseTemp: Course = {
          title: Title,
          duration: Duration,
          code: Code
        };

        let courseInstance: CourseInstance = {
          startDate: DateStart,
          course: courseTemp 
        };
        courses.push(courseInstance);
      }
      console.log(courses);
    }
    myReader.readAsText(file);
    return courses;
  }
}
