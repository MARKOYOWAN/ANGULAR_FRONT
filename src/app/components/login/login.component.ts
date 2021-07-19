import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiGlobalService } from 'src/app/services/api-global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  modelCLient = {
    email: null,
  }
  showLoader: boolean = false;
  constructor(private api: ApiGlobalService,
    public dialog: MatDialog,) { }
 //   private toastr: ToastrService,

  ngOnInit(): void {
  }
  loginUser() {
    this.showLoader = true;
    this.api.LoginUser(this.modelCLient).subscribe(res => {
      if (res) {
        console.log("user", res)
        this.dialog.closeAll();
        this.showLoader = false;
      }
    })
  }

}
