import { Component, OnInit } from '@angular/core';
import { ApiGlobalService } from 'src/app/services/api-global.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private api: ApiGlobalService) { } 
  images: any;
  ngOnInit(): void {
    this.InitialiseCode();
  }
  InitialiseCode() {
    this.Image();
  }


  Image() {
    this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    console.log(this.images)
  }
}
