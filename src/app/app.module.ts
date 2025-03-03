import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { PeopleRegisterComponent } from './pages/people-register/people-register.component';
import { FooterComponent } from './components/footer/footer.component';
import { PeopleEditComponent } from './pages/people-edit/people-edit.component';
import { TableComponent } from './components/table/table.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactShowModalComponent } from './components/contact-show-modal/contact-show-modal.component';
import { NoNumbersDirective } from './directives/no-numbers.directive';
import { NoSpecialCharDirective } from './directives/no-special-char.directive';
import { NoWordDirective } from './directives/no-word.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleListComponent,
    PeopleRegisterComponent,
    FooterComponent,
    PeopleEditComponent,
    TableComponent,
    ContactModalComponent,
    ContactShowModalComponent,
    NoNumbersDirective,
    NoSpecialCharDirective,
    NoWordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
