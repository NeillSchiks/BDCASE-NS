import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { CourseInstance } from '../models/CourseInstance';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {
  data: string;

  constructor() { }

  loadFile(inputValue) {
    let file: File = inputValue.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = ((e) => {
      this.data = reader.result as string;
    });
    reader.readAsText(file);
  }

  check(inputValue: any): boolean{
    


    return true;
  }



  readThis(inputValue: any): CourseInstance[] {
    if(this.check(inputValue) === true)
    {
      let file: File = inputValue.files[0];
      let myReader: FileReader = new FileReader();
      let courses: CourseInstance[] = [];
    
      myReader.onloadend = function(e) {
        let data = myReader.result as string;
        let array: string[] = data.split('\n\n');

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
}
