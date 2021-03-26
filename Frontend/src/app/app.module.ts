import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CourseinstanceListComponent } from './components/course/courseinstance-list/courseinstance-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadFileComponent } from './components/course/upload-file/upload-file.component';

const appRoutes: Routes = [
  {path: 'courseinstances', component: CourseinstanceListComponent},
  {path: 'uploadfile', component: UploadFileComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CourseinstanceListComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
