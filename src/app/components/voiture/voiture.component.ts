import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiGlobalService } from 'src/app/services/api-global.service';


@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})


export class VoitureComponent implements OnInit {
  liste!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'Title', 'Texte', 'Action'];
  showLoader: boolean = false;
  id: Number;
  constructor(public api: ApiGlobalService) { }

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  ngOnInit() {
    this.InitialiseCode()
  }

  InitialiseCode() {
    this.recupListElement();
    this.api.geSorage().then((res) => {
      if (res) {
        this.api.login = true;
        this.id = res.id;
        console.log("data storage", res)
      }
    })
  }


  async recupListElement() {
    this.showLoader = true;
    this.api.getPost().subscribe((data: any) => {
      if (data) {
        this.liste = new MatTableDataSource(data);
        this.liste.sort = this.sort;
        this.liste.paginator = this.paginator;
        this.showLoader = false;
      }
    });
  }

  commenter(code: Number) {
    console.log("identifiant", code);
    this.api.getComment(code).subscribe(res => {

    })
  }
}
