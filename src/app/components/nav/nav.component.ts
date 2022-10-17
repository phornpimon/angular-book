import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public master: any
  public input: any
  public listbook: any

  constructor(
    private bookservice: BookService,
  ) { }

  ngOnInit(): void {
    this.master = {
      bookcategory: [
        { id: 1, code: 'COMPUTER', name: 'คอมพิวเตอร์' },
        { id: 2, code: 'LANGUAGE', name: 'ภาษา' },
        { id: 3, code: 'HISTORY', name: 'ประวัติศาสตร์' },
        { id: 4, code: 'SCIENCE', name: 'วิทยาศาสตร์' },
        { id: 5, code: 'RELIGION', name: 'ศาสนา' },
        { id: 6, code: 'SOCIETY', name: 'สังคม' },
        { id: 7, code: 'HEALTH', name: 'สุขภาพ' },
        { id: 8, code: 'HOBBY', name: 'งานอดิเรก' },
        { id: 9, code: 'CARTOON', name: 'การ์ตูน' },
        { id: 10, code: 'BUSINESS', name: 'ธุรกิจ' },
      ],
      menu: [
        { id: 1, code: 'newbook', name: 'หนังสือใหม่' },
        { id: 2, code: 'popularbook', name: 'หนังสือยอดนิยม' },
        { id: 3, code: 'recommendbook', name: 'หนังสือแนะนำ' },
        { id: 4, code: 'digitalread', name: 'Digital Read' },
        { id: 5, code: 'favorite', name: 'รายการโปรด' },
      ]
    },
    this.input = {
      searchbookname: '',
      flag: 'all',
      loadmore: true,
      offSet: 0,
      pageSize: 8,
      searchShow: false
    }
  }

  searchBooKCategory(category: any): void {
    this.input.category = category
    this.input.pageSize = 8
    this.input.loadmore = true
    this.getBookCategory(category, this.input.offSet, this.input.pageSize)
  }

  getBookCategory(category: any, offSet: number, pageSize: number): void {
    this.bookservice.getBookCategory(category, offSet, pageSize).subscribe((data: any) => {
      if (data) {
        this.bookservice.listbook = data.books.content
        this.input.flag = 'category'
        this.input.searchShow = true
        this.input.searchText = `หมวดหนังสือ: ${category}`
        this.input.searchCount = data.books.totalElements
        if (data.books.totalElements <= data.totalBook) {
          this.input.loadmore = false
        }
      }
    })
  }
}
