import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ApiGlobalService } from 'src/app/services/api-global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  loginForm: FormGroup;
  data : any = {
    email : ''
  }

  showLoader: boolean = false;
  constructor(private api: ApiGlobalService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  error: boolean = false;
  loginUser() {
    const _data = this.loginForm.getRawValue();
    this.data.email = _data.email; 
    this.showLoader = true;
    this.api.LoginUser(this.data).subscribe(res => { 
      if (res) {
        this.dialog.closeAll();
        this.api.setStorage(res);
        this.api.showSuccess('Connexion', 'Avec succès');
        this.api.login = true;
        this.showLoader = false;
      }
    }, async (error) => {
      this.api.showError('Erreur', 'Votre email n\'existe pas');
      this.showLoader = false;
      this.loginForm.controls.email.setValue('')
      this.loginForm.controls.email.setErrors(null)
      this.loginForm.updateValueAndValidity()
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Entrer la bonne valeur svp!!!';
    }
    return this.email.hasError('email') ? 'Email n\'est pas validé' : '';
  }

}
