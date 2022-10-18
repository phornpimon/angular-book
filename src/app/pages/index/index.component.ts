import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { ROUTE_PATH } from 'src/app/shared/constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public imglink: any
  public input: any

  constructor(
    public bookservice: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.imglink = 'https://youtubeclone-joy.s3.ap-southeast-1.amazonaws.com/'
    this.input = {
      searchbookname: '',
      flag: 'all',
      loadmore: true,
      offSet: 0,
      pageSize: 8,
      searchShow: false
    }
    this.getAllbook(this.input.offSet, this.input.pageSize)
  }

  getAllbook(offSet: number, pageSize: number): void {
    this.bookservice.getAllBook(offSet, pageSize).subscribe((data: any) => {
      if (data) {
        this.bookservice.listbook = data.books.content
        this.input.flag = 'all'
        if (data.books.totalElements <= data.totalBook) {
          this.input.loadmore = false
        }
      }
    })
  }

  searchBookByName(): void {
    let bookname = this.input.searchbookname
    this.input.pageSize = 8
    this.input.loadmore = true
    this.getBookByName(bookname, this.input.offSet, this.input.pageSize)
  }

  getBookByName(bookname: any, offSet: number, pageSize: number): void {
    if (bookname == '') {
      this.ngOnInit()
      this.getAllbook(this.input.offSet, this.input.pageSize)
    } else {
      this.input.flag = 'bookname'
      this.bookservice.getBookByName(bookname, offSet, pageSize).subscribe((data: any) => {
        if (data) {
          this.bookservice.listbook = data.books.content
          this.input.searchShow = true
          this.input.searchText = `ชื่อหนังสือ: ${bookname}`
          this.input.searchCount = data.books.totalElements
          if (data.books.totalElements <= data.totalBook) {
            this.input.loadmore = false
          }
        }
      })
    }
  }

  sortbyField() : void {
    this.input.pageSize = 8
    this.input.loadmore = true
    this.getSortbyField(this.input.field, this.input.offSet, this.input.pageSize)
  }

  getSortbyField(field: string, offSet: number, pageSize: number) : void {
    this.bookservice.getBookByField(field, offSet, pageSize).subscribe((data: any) => {
      if (data) {
        this.bookservice.listbook = data.books.content
        this.input.flag = 'sortbook'
        if (data.books.totalElements <= data.totalBook) {
          this.input.loadmore = false
        }
      }
    })
  }

  getLoadMore(): void {
    this.input.pageSize += 8
    switch (this.input.flag) {
      case 'all':
        this.getAllbook(this.input.offSet, this.input.pageSize)
        break;
      case 'category':
        // this.getBookCategory(this.input.category, this.input.offSet, this.input.pageSize)
        break;
      case 'bookname':
        this.getBookByName(this.input.searchbookname, this.input.offSet, this.input.pageSize)
        break;
      case 'sortbook':
        this.getSortbyField(this.input.field, this.input.offSet, this.input.pageSize)
        break;
      default:
        break;
    }
  }

  getBook(id: any): void {
    this.router.navigate([`${ROUTE_PATH.BOOK.LINK}/${id}`])
  }
}
