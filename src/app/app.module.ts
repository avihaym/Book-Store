import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/book-list', pathMatch: 'full' },
  { path: 'book-list', component: BookListComponent },
  { path: 'add', component: BookFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListComponent,
    BookFormComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  entryComponents: [BookDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
