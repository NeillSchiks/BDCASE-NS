import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/Course';
import { CourseInstance } from '../models/CourseInstance';
import { ErrorModel } from '../models/ErrorModel';
import { CourseinstanceService } from './courseinstance.service';

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

        //check of de rijen kloppen in het bestand
        let checkContent = this.checkRows(document);
        if(checkContent.bool === false){
          observer.error(checkContent);
        }

        //check of de volgorde van de rijen klopt
        let checkOrder = this.checkOrder(document);
        if(checkOrder.bool === false){
          observer.error(checkOrder);
        }

        //check of datum notatie klopt
        let checkDate = this.checkDate(document);
        if(checkDate.bool === false){
          observer.error(checkDate);
        }

        //check of duur van de cursus correct is
        let checkDuration = this.checkDuration(document);
        if(checkDuration.bool === false){
          observer.error(checkDuration)
        }

        let content: CourseInstance[] = this.assignCourseInstances(document);
        observer.next(content);
      });
      myReader.readAsText(file);
    });
  }

  checkDuration(content): ErrorModel {
    let error: ErrorModel = { bool: true};
    for(let i = 0; i < content.length; i++){
      let object = content[i];
      let duration: string = object[2].substr(6);

      if(!duration.includes('dagen')){
        error.bool = false;
        error.message = 'De duur van de cursus is niet correct';
        error.row = (i * 5) + 3;
      }
      else {
        error.bool = true;
      }
    }
    return error;
  }

  checkDate(content): ErrorModel {
    let error: ErrorModel = { bool: true};
    for(let i = 0; i < content.length; i++){
      let object = content[i];
      let dateString: string = object[3].substr(12);
      if(!dateString.includes('/')){
        error.bool = false;
        error.message = 'De datum notatie is niet correct';
        error.row = (i * 5) + 4;
      }
      else{
        error.bool = true;
      }
    }
    return error;
  }

  checkRows(content): ErrorModel {
    let error: ErrorModel = { bool: true};
    for(let i = 0; i < content.length; i++){
      let object = content[i];
      if(object.length > 4){
        error.bool = false;
        error.message = 'Het aantal rijen klopt niet';
        error.row = (i * 5) + 5;
      }
      if(object.length < 4){
        error.bool = false;
        error.message = 'Het aantal rijen klopt niet';
        error.row = (i * 5) + object.length + 1;
      }
    }
    return error;
  }

  checkOrder(content): ErrorModel {
    let error: ErrorModel = { bool: true};
    for(let i = 0; i < content.length; i++){
      let object: string[] = content[i];
      let title: string = object[0].slice(0, 5);
      let code: string = object[1].slice(0, 10);
      let duration: string = object[2].slice(0, 4);
      let date: string = object[3].slice(0, 10);
      if(title !== 'Titel'){
        error.bool = false;
        error.message = 'Volgorde van data niet correct';
        error.row = (i * 5) + 1;
      }
      if(code !== 'Cursuscode'){
        error.bool = false;
        error.message = 'Volgorde van data niet correct';
        error.row = (i * 5) + 2;
      }
      if(duration !== 'Duur'){
        error.bool = false;
        error.message = 'Volgorde van data niet correct';
        error.row = (i * 5) + 3;
      }
      if(date !== 'Startdatum'){
        error.bool = false;
        error.message = 'Volgorde van data niet correct';
        error.row = (i * 5) + 3;
      }
    }
    return error;
  }

  doubleEnterSplit(content: string): string[] {
    let array: string[] = content.split('\n\n');
    for(let i = 0; i < array.length; i++){
      if(array[i] === '' || array[i] === ' ') {
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

  assignCourseInstances(content: any[]): CourseInstance[] {
    let courses: CourseInstance[] = [];
    for(let i = 0; i < content.length; i++){
      let object = content[i];

      let title: string = object[0].substr(7);
      let code: string = object[1].substr(12);
      let duration: string = object[2].substr(6);
      let dateString: string = object[3].substr(12);
      
      let dateParts = dateString.split("/");
      var dateObject = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      
      let courseTemp: Course = {
        title: title,
        duration: duration,
        code: code
      };

      let courseInstance: CourseInstance = {
        startDate: new Date(dateObject),
        course: courseTemp 
      };
      courses.push(courseInstance);
    }
    return courses;
  }
}
