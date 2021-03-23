import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CourseinstanceListComponent } from './components/course/courseinstance-list/courseinstance-list.component';
import { CourseAddComponent } from './components/course/course-add/course-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: 'courses', component: CourseListComponent},
  {path: 'courseinstances', component: CourseinstanceListComponent},
  {path: 'courseadd', component: CourseAddComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseinstanceListComponent,
    CourseAddComponent
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
