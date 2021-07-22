import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ApiGlobalService } from './services/api-global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  email: string;
  ngOnInit() {  
    this.User();
  } 
  constructor(private route: Router,
    public api: ApiGlobalService,
    private dialog: MatDialog,) { }

  ngOnChanges() {  
    this.User();
  }
  hide = true;
  title = 'Test';

  Deconnexion() {
    this.api.removeClient();
    this.api.login = false;
    this.api.showSuccess('Vous avez Déconnecté', 'Avec succès');
  }

  Connexion(){
    this.dialog.open(LoginComponent,{
      width:'35%',
      data :{}
    }); 
  }

  User() {
    this.api.geSorage().then((res) => {
      if (res) { 
        this.email = res.email; 
      }
    })
  }
}
