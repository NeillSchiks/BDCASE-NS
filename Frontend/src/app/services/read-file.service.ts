import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/Course';
import { CourseInstance } from '../models/CourseInstance';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  constructor() { }

  readFile(inputValue: any): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let data: string;

      let file: File = inputValue.files[0];
      let myReader: FileReader = new FileReader();
      myReader.onloadend = ((e) => {
        data = myReader.result as string;

        let array: string[] = this.doubleEnterSplit(data);

        let document: any[] = this.enterSplit(array);

        let checkContent = this.checkRows(document);
        if(checkContent !== 'true'){
          observer.error(checkContent);
        }

        let checkOrder = this.checkOrder(document);
        if(checkOrder !== 'true'){
          observer.error(checkOrder);
        }

        let content: object[] = this.colonSplit(document);

        observer.next(content);
      });
      myReader.readAsText(file);
    });
  }

  checkRows(content): string {
    for(let i = 0; i < content.length; i++){
      let object = content[i];
      if(object.length !== 4){
        return 'Het aantal rijen per cursus instantie klopt niet, controleer het bestand';
      }
    }
    return 'true';
  }

  checkOrder(content): string {
    for(let i = 0; i < content.length; i++){
      let object: string[] = content[i];
      let title: string = object[0].slice(0, 5);
      let code: string = object[1].slice(0, 10);
      let duration: string = object[2].slice(0, 4);
      let date: string = object[3].slice(0, 10);
      console.log(title, code, duration, date);
      if(title !== 'Titel' || code !== 'Cursuscode' || duration !== 'Duur' || date !== 'Startdatum'){
        return 'Volgorde van data klopt niet, controleer het bestand';
      }
    }
    return 'true';
  }

  doubleEnterSplit(content: string): string[] {
    let array: string[] = content.split('\n\n');
    for(let i = 0; i < array.length; i++){
      if(array[i] === '' || array[i] === ' '){
        array.splice(i, 1);
      }
    }
    return array;
  }

  enterSplit(content: string[]): any[] {
    let array: any[] = [];
    for(let i = 0; i < content.length; i++){
      let object = content[i].split('\n');
      array.push(object);
    }
    return array;
  }

  colonSplit(content: string[]): CourseInstance[]{
    let courses: CourseInstance[] = [];
    for(let i = 0; i < content.length; i++){
      

      var object = content[i];

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
    return courses;
  }
  
  readThis(inputValue: any): CourseInstance[] {
    
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();
    let courses: CourseInstance[] = [];
    
    myReader.onloadend = ((e) => {
      let data = myReader.result as string;

      let array: string[] = this.doubleEnterSplit(data);

      let document: any[] = this.enterSplit(array);
        
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
    });
    myReader.readAsText(file);
    return courses;
  };
}
