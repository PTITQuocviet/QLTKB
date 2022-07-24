import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginInterceptorService } from './login/login-interceptor.service';
import { PaggingComponent } from './pagging/pagging.component';
import { DatePickerInputComponent } from './shared/component/date-picker-input/date-picker-input.component';
import { DatePipe } from '@angular/common';
import { IntervalPipe } from './shared/pipe/interval.pipe';
import { ModalYesNoComponent } from './shared/modal-yes-no/modal-yes-no.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ManagestudentComponent } from './managestudent/managestudent.component';
import { CenterStudentComponent } from './admin/center-student/center-student.component';
import { CenterTeacherComponent } from './admin/center-teacher/center-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    SidebarComponent,
    PaggingComponent,
    DatePickerInputComponent,
    IntervalPipe,
    ModalYesNoComponent,
    StudentComponent,
    TeacherComponent,
    ManagestudentComponent,
    CenterStudentComponent,
    CenterTeacherComponent,
  ],
  imports: [
    BrowserModule
    , AppRoutingModule, HttpClientModule
    , FormsModule, NgbModule
    , DlDateTimeDateModule, DlDateTimePickerModule // date time picker
  ],
  providers: [
    DatePipe
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
