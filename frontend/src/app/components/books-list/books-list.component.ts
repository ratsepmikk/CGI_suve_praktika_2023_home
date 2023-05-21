import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
// import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  books$!: Observable<Page<Book>>;

  constructor(
    private bookService: BookService,
    // private paginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});
    // this.books$.subscribe((books) => {
    //   this.paginator.length = books.totalElements;
    //   this.paginator.pageSize = books.content.length;
    //   this.paginator.pageIndex = books.number;
    // });

    // this.paginatorIntl.itemsPerPageLabel = 'Items per page:';
    // this.paginatorIntl.nextPageLabel = 'Next page';
    // this.paginatorIntl.previousPageLabel = 'Previous page';
    // this.paginatorIntl.getRangeLabel = this.customRangeLabel;
  }

  // customRangeLabel(page: number, pageSize: number, length: number): string {
  //   if (length === 0 || pageSize === 0) {
  //     return `0 of ${length}`;
  //   }

  //   length = Math.max(length, 0);
  //   const startIndex = page * pageSize;
  //   const endIndex =
  //     startIndex < length
  //       ? Math.min(startIndex + pageSize, length)
  //       : startIndex + pageSize;

  //   return `${startIndex + 1} - ${endIndex} of ${length}`;
  // }
}

