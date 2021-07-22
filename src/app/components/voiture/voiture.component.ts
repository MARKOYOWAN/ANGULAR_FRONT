import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiGlobalService } from 'src/app/services/api-global.service';
import { CommentaireComponent } from '../commentaire/commentaire.component';


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
  searchKey: string;
  constructor(public api: ApiGlobalService,
    private dialog: MatDialog) { }

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

  applyFilter() {
    this.liste.filter =this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey="";
    this.applyFilter();
  }
  commenter(code: Number) {
    console.log("identifiant", code);
    this.dialog.open(CommentaireComponent,{
      width:'45%',
      height: '35%',
      data :{code}
    });
  }
}
