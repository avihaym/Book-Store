import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from "../../services/book.service";
import { ToastrService } from 'ngx-toastr';
import { BookDetailsComponent }  from '../book-details/book-details.component';
import { Book } from '../../interfaces/book.interface';
    
@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private modalService: NgbModal,
              private bookService: BookService,
              private toastr: ToastrService,) { }

  ngOnInit() {
    this.bookService.get().subscribe( res => {
      console.log(res);
      if (res.status === "error"){
        this.toastr.error(res.msg);
      } else {
        this.books = res.msg;
      }
    });
  }

  delete(id, index){
    if(confirm("Are you sure?")){
      this.bookService.delete(id).subscribe( res => {
        if (res.status === "error"){
          this.toastr.error(res.msg);
        } else {
          this.books.splice(index, 1);
          this.toastr.success(res.msg);
        }
      });
    }
  }

  openDetailsPage(data) {
    const modalRef = this.modalService.open(BookDetailsComponent)
    modalRef.componentInstance.bookdata = data;
  }

}
