import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';
import { ReadFileService } from 'src/app/services/read-file.service';

import { UploadFileComponent } from './upload-file.component';

class MockCourseinstanceService{
  getAll() {}
  add() {}
}

class MockReadFileService {
  readFile() {}
}

describe('Component: UploadFileComponent', () => {
  let sut: UploadFileComponent;
  let mockReadFileService: ReadFileService;
  let mockCourseinstanceService: CourseinstanceService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [ UploadFileComponent ],
          imports: [ ],
          providers: [ { provide: ReadFileService, useClass: MockReadFileService}, {provide: CourseinstanceService, useClass: MockCourseinstanceService} ],
      });

      sut = TestBed.createComponent(UploadFileComponent).componentInstance;
      mockReadFileService = TestBed.inject(ReadFileService);
      mockCourseinstanceService = TestBed.inject(CourseinstanceService);
      spyOn(mockReadFileService, 'readFile');
      spyOn(mockCourseinstanceService, 'add');
    });

  it('should have add course instances call', () => {
      sut.upload();
      expect(mockCourseinstanceService.add).toHaveBeenCalled();
  });

  it('should have readFile call', () => {
      let $event: File;
      sut.uploadFiles($event);
      expect(mockReadFileService.readFile).toHaveBeenCalled();
  });
});
