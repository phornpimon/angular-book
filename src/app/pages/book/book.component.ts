import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public input: any

  constructor(
    private bookservice: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.input = {
      id: this.route.snapshot.paramMap.get("id")
    }

    this.getBookById(this.input.id)
  }

  getBookById(id: any): void {
      this.bookservice.getBookById(id).subscribe((data: any) => {
        if (data) {
          this.input.image = data.image
          this.input.bookname = data.bookname
          this.input.author = data.author
        }
      })
    
  }

}
