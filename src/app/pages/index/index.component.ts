import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public master: any
  public listbook: any
  public imglink: any
  public input: any

  constructor(
    private bookservice: BookService,
  ) { }

  ngOnInit(): void {
    this.listbook = []
    this.imglink = 'https://youtubeclone-joy.s3.ap-southeast-1.amazonaws.com/'
    this.master = {
      bookcategory: [
        { id: 1, code: 'COMPUTER', name: 'คอมพิวเตอร์'},
        { id: 2, code: 'LANGUAGE', name: 'ภาษา'},
        { id: 3, code: 'HISTORY', name: 'ประวัติศาสตร์'},
        { id: 4, code: 'SCIENCE', name: 'วิทยาศาสตร์'},
        { id: 5, code: 'RELIGION', name: 'ศาสนา'},
        { id: 6, code: 'SOCIETY', name: 'สังคม'},
        { id: 7, code: 'HEALTH', name: 'สุขภาพ'},
        { id: 8, code: 'HOBBY', name: 'งานอดิเรก'},
        { id: 9, code: 'CARTOON', name: 'การ์ตูน'},
        { id: 10, code: 'BUSINESS', name: 'ธุรกิจ'},
      ],
      menu: [
        { id: 1, code: 'newbook', name: 'หนังสือใหม่'},
        { id: 2, code: 'popularbook', name: 'หนังสือยอดนิยม'},
        { id: 3, code: 'recommendbook', name: 'หนังสือแนะนำ'},
        { id: 4, code: 'digitalread', name: 'Digital Read'},
        { id: 5, code: 'favorite', name: 'รายการโปรด'},
      ]
    }
    this.input = {
      searchbookname: '',
      loadmore: true,
      offSet: 0,
      pageSize: 8
    }
    this.getAllbook(this.input.offSet, this.input.pageSize)
  }

  getAllbook(offSet: number, pageSize: number): void {
    this.bookservice.getAllBook(offSet, pageSize).subscribe((data: any) => {
      if (data) {
        this.listbook = data.books.content
        if (data.books.totalElements <= data.totalBook) {
          this.input.loadmore = false
        }
      }
    })
  }
  getBooKCategory(category: any): void {
    this.searchBookCategory(category, this.input.offSet, this.input.pageSize)
  }

  searchBookCategory(category: any, offSet: number, pageSize: number): void {
    this.bookservice.getBookCategory(category, offSet, pageSize).subscribe((data: any) => {
      if (data) {
        this.listbook = data.books.content
        if (data.books.totalElements <= data.totalBook) {
          this.input.loadmore = false
        }
      }
    })
  }

  getLoadMore(): void {
    this.input.pageSize+=8
    this.getAllbook(this.input.offSet, this.input.pageSize)
  }

  searchBookByName(): void {
    console.log(this.input.searchbookname)
    let bookname = this.input.searchbookname
    this.bookservice.getBookByName(bookname).subscribe((data: any) => {
      if (data) {
        this.listbook = data.books
      }
    })
  }
}
