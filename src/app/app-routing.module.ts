import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { PeopleRegisterComponent } from './pages/people-register/people-register.component';
import { PeopleEditComponent } from './pages/people-edit/people-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent,
  },
  {
    path: ':id',
    component: PeopleListComponent,
  },
  {
    path: 'pessoas/register',
    component: PeopleRegisterComponent,
  },
  {
    path: 'pessoas/register/:id',
    component: PeopleRegisterComponent,
  },
  {
    path: 'pessoas/edit/:id',
    component: PeopleEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
