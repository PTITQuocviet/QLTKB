import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './shared/login-guard.service';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ManagestudentComponent } from './managestudent/managestudent.component';
import { CenterStudentComponent } from './admin/center-student/center-student.component';
import { CenterTeacherComponent } from './admin/center-teacher/center-teacher.component';
import { TeacherGuard } from './shared/teacher-guard.service';
import { StudentGuard } from './shared/student-guard.service';
import { AdminGuard } from './shared/admin-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'student'
    , canActivate: [LoginGuard, StudentGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: StudentComponent
    // , resolve: [MetaSearchResolverService]//đảm bảo có đủ meta trước khi search
  },
  {
    path: 'teacher'
    , canActivate: [LoginGuard, TeacherGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: TeacherComponent
    // , resolve: [MetaSearchResolverService]//đảm bảo có đủ meta trước khi search
  },
  // admin
  { path: 'admin/:idcenter', redirectTo: '/admin/:idcenter/teacher', pathMatch: 'full' },
  {
    path: 'admin/:idcenter/student'
    , canActivate: [LoginGuard, AdminGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: CenterStudentComponent
  },
  {
    path: 'admin/:idcenter/teacher'
    , canActivate: [LoginGuard, AdminGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: CenterTeacherComponent
  },

  // teacher
  { path: 'teacher/:idClass', redirectTo: '/teacher/:idClass', pathMatch: 'full' },
  {
    path: 'teacher/:idClass'
    , canActivate: [LoginGuard, TeacherGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: ManagestudentComponent
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'not-found'
    , component: ErrorPageComponent
    , data: { message: 'Page not found!' }
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
