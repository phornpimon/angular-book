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

  constructor(
    private bookservice: BookService,
  ) { }

  ngOnInit(): void {
    this.listbook = []
    this.imglink = 'https://youtubeclone-joy.s3.ap-southeast-1.amazonaws.com/'
    this.master = {
      bookcategory: [
        { id: 1, code: 'newbook', name: 'หนังสือใหม่'},
        { id: 2, code: 'popularbook', name: 'หนังสือยอดนิยม'},
        { id: 3, code: 'recommendbook', name: 'หนังสือแนะนำ'},
        { id: 4, code: 'digitalread', name: 'Digital Read'},
        { id: 5, code: 'favorite', name: 'รายการโปรด'},
      ],
      menu: [
        { id: 1, code: 'newbook', name: 'หนังสือใหม่'},
        { id: 2, code: 'popularbook', name: 'หนังสือยอดนิยม'},
        { id: 3, code: 'recommendbook', name: 'หนังสือแนะนำ'},
        { id: 4, code: 'digitalread', name: 'Digital Read'},
        { id: 5, code: 'favorite', name: 'รายการโปรด'},
      ]
    }
    this.getAllbook()
  }

  getAllbook(): void {
    this.bookservice.getAllBook().subscribe((data: any) => {
      if (data) {
        this.listbook = data.books
      }
    })
  }
}
