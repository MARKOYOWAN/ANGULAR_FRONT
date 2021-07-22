import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGlobalService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  private lien = environment;
  private Comments = "comment/getComments/";
  private Post = "post/geTPost";
  private auth = "auth/login"
  public login: boolean = false;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  async geSorage():Promise<any> {
   const val:any = await localStorage.getItem('dataSource');   
   if(val) {
     this.user.next(val);
     return JSON.parse(val)
   }
    return null;

  }

  setStorage(val:any) { 
    localStorage.setItem('dataSource', JSON.stringify(val));
    this.user.next(val);
  }
  getPost(): Observable<any> {
    return this.http.get(this.lien.lienAPI + `${this.Post}`)
  }
  getComment(id: Number): Observable<any> {
    return this.http.get(this.lien.lienAPI + `${this.Comments}` + id)
  }

  LoginUser(ModelClient: Object): Observable<any> {
    return this.http.post(this.lien.lienAPI + `${this.auth}`, ModelClient)
  }


  showSuccess(title: string, message: string) {
    this.toastr.success(title, message)
  }

  showError(title: string, message: string) {
    this.toastr.warning(title, message)
  }

  async removeClient() {
    await  localStorage.clear();
    this.user.next(null);
  }

}
