import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateISBN } from '../../validators/isbn.validator';
import { ValidateDate } from '../../validators/date.validator';
import { BookService } from "../../services/book.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  genres: string[] = ['Science fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror'].sort();
  errorMsg: string = '';

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isbn: ['', [Validators.required, ValidateISBN]],
      author: ['', Validators.required],
      pubDate: [{day: day, month: month, year: year}, [Validators.required, ValidateDate]],
      genre:  ['Action', Validators.required],
      price: ['0.00', [Validators.required, Validators.pattern("[0-9]+(\.[0-9]{1,2})?$")]],
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.bookForm.controls; }

  submit(){
    if (this.bookForm.invalid) {
      this.toastr.error("Please fill all form fields.");
    } else {
      let formData = this.bookForm.getRawValue();
      const {day, month, year} = formData.pubDate;
      // convert datetime to timestamp
      formData.pub_date = new Date(`${year}-${month}-${day}`).getTime();
      this.bookService.create(formData).subscribe( (res) => {
      if (res.status === "error"){
        this.toastr.error(res.msg);
      } else {
        this.toastr.success("Book created successfully");
        this.bookForm.reset();
      }
    });
    }
  }
}
