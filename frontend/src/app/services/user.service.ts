import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/models/constants/urls';
import { IUserLogin } from '../shared/models/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import Swal from 'sweetalert2';
import { USER_REGISTER_URL } from '../shared/models/constants/urls';
import { IUserRegister } from '../shared/models/interfaces/IUserRegister';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());

  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            title: `Welcome to SEASONPASS ${user.name}!`,
            text: 'Login Successful',
            icon: 'success'
          });
        },
        error: (errorResponse) => {
          Swal.fire({
            title: 'Login Failed',
            text: errorResponse.error,
            icon: 'error'
          });
        },
      })

    );
  }
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            title: `Welcome to the SEASONPASS ${user.name}`,
            text: 'Register Successful',
            icon: 'success'
          });
        },
        error: (errorResponse) => {
          Swal.fire({
            title: 'Register Failed',
            text: errorResponse.error,
            icon: 'error'
          });
        }
      })
    );
  }


  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
