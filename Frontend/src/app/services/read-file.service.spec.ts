import { TestBed } from '@angular/core/testing';
import { CourseInstance } from '../models/CourseInstance';
import { ErrorModel } from '../models/ErrorModel';

import { ReadFileService } from './read-file.service';

describe('ReadFile Service: Dependency Injection', () => {
  let service: ReadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Service: ReadFileService', () => {
  let sut: ReadFileService;

  beforeEach(() => {
    sut = new ReadFileService;
  });

  it('should split data on double enter', () => {
    const content: string = 'Titel\nCursuscode\nDuur\nStartdatum\n\nTitel\nCursuscode\nDuur\nStartdatum\n\nTitel\nCursuscode\nDuur\nStartdatum';
    let array = sut.doubleEnterSplit(content);
    expect(array.length).toBe(3);
  });

  it('should ignore last double enter at the end of the string', () => {
    const content: string = 'Titel\nCursuscode\nDuur\nStartdatum\n\nTitel\nCursuscode\nDuur\nStartdatum\n\nTitel\nCursuscode\nDuur\nStartdatum\n\n ';
    let array = sut.doubleEnterSplit(content);
    expect(array.length).toBe(3);
  });

  it('should split eacht object on enter', () => {
    const content: string[] = ['Titel\nCursuscode\nDuur\nStartdatum', 'Titel\nCursuscode\nDuur\nStartdatum'];
    let array = sut.enterSplit(content);
    expect(array[0].length).toBe(4);
    expect(array[1].length).toBe(4);
  });

  it('should return error when data types of course instance are in wrong order', () =>{
    const content: any[] = [['Titel: c#', 'Duur: 5 dagen', 'Cursuscode: CS', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Cursuscode: BLZ', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: ErrorModel = sut.checkOrder(content);
    expect(check.bool).toBe(false);
  });
  
  it('should return true when data types of course instance are in right order', () =>{
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Cursuscode: BLZ', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: ErrorModel = sut.checkOrder(content);
    expect(check.bool).toBe(true);
  });

  it('should check if all objects contains an array with four objects', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Cursuscode: BLZ', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: ErrorModel = sut.checkRows(content);
    expect(check.bool).toBe(true);
  });

  it('should return false when object in array contains less than 4 objects', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: ErrorModel = sut.checkRows(content);
    expect(check.bool).toBe(false);
    expect(check.row).toBe(9);
  });

  it('should return false when object in array contains more than 4 objects', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Cursuscode: CS', 'Cursuscode: CS', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: ErrorModel = sut.checkRows(content);
    expect(check.bool).toBe(false);
  });

  it('should return array of two course instances', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24'], ['Titel: Blazor', 'Cursuscode: CS', 'Cursuscode: CS', 'Duur: 2 dagen', 'Startdatum: 2021/03/21']];
    let check: CourseInstance[] = sut.assignCourseInstances(content);
    expect(check.length).toBe(2);
  });

  it('should return true when date annotation is right', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24']];
    let check: ErrorModel = sut.checkDate(content);
    expect(check.bool).toBe(true);
  });

  it('should return false when date annotation is wrong', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021-03-24']];
    let check: ErrorModel = sut.checkDate(content);
    expect(check.bool).toBe(false);
  });

  it('should return true when duration annotation is right', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5 dagen', 'Startdatum: 2021/03/24']];
    let check: ErrorModel = sut.checkDuration(content);
    expect(check.bool).toBe(true);
  });

  it('should return false when duration annotation is wrong', () => {
    const content: any[] = [['Titel: c#', 'Cursuscode: CS', 'Duur: 5', 'Startdatum: 2021/03/24']];
    let check: ErrorModel = sut.checkDuration(content);
    expect(check.bool).toBe(false);
  });
  
});
