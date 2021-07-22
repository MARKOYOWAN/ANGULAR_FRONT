import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiGlobalService } from 'src/app/services/api-global.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  id: Number;
  list: any;
  showLoader: boolean = false;
  constructor(public api: ApiGlobalService,
    @Inject(MAT_DIALOG_DATA) public data: { code:any }) {
    if (data.code) {
      this.id = data.code
    }
  }

  ngOnInit() {
    this.Commentaire();
  }

  Commentaire() {
    this.showLoader = true;
    this.api.getComment(this.id).subscribe(res => {
      if (res) {
        this.showLoader = false;
        console.log("commentaire", res);
        this.list = res;
      }
    })
  }

}
