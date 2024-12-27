import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path:'add-course',component: AddCourseComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'edit-course/:id', component: EditCourseComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
